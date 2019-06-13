<?php

namespace App\Modules\Payment\Services;

use Carbon\Carbon;
use Multipay\Multipay;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Modules\Payment\Repositories\PaymentRepository;
use App\Modules\Transaction\Repositories\TransactionRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * @SuppressWarnings(PHPMD.StaticAccess)
 */
class PaymentService
{
    protected $payment;
    protected $transaction;

    public function __construct(
        PaymentRepository $payment,
        TransactionRepository $transaction
    ) {
        $this->payment     = $payment;
        $this->transaction = $transaction;
    }

    public function process($transaction)
    {
        DB::beginTransaction();
        $amount = $transaction['amount'] ?? 0;

        if (!$paymentData = self::generateMultipayReferenceNumber($transaction, $amount)) {
            return false;
        }

        if (!$transaction->update(['status' => 'FOR PAYMENT'])) {
            return false;
        }

        if (!$payment = self::createPayment($paymentData, $transaction)) {
            return false;
        }

        DB::commit();
        return $payment;
    }

    private function generateMultipayReferenceNumber($transaction, $amount)
    {
        $profile = $transaction->profile;
        $multiPay = new Multipay(config('multipay.code'), config('multipay.token'));

        $transaction = $multiPay->generate([
            'code' => config('multipay.code'),
            'token' => config('multipay.token'),
            'name' => $profile->first_name.' '.$profile->last_name,
            'amount' => $amount,
            'txnid' => $transaction->txnid,
            'mobile' => $profile->mobile,
            'email' => $profile->user->email,
            'channel' => 'MPAY',
            'callback_url' => 'https://apollo-ws.geek-demos.com/ste/payment/receive'//secure_url('ste/payment/receive')
        ]);

        if (is_null($transaction)) {
            throw new BadRequestHttpException('Failed to generate reference number');
        }

        if ($transaction['status'] >= 400) {
            throw new BadRequestHttpException(json_encode($transaction));
        }

        return $transaction['data'];
    }

    public function receive($payment, $payload)
    {
        if ($payload['status'] != 'S') {
            return $payment->update([
                'status' => $payload['status'],
                'remarks' => $payload['message']
            ]);
        }

        return $payment->update([
            'status' => $payload['status'],
            'remarks' => $payload['message'],
//            'payment_channel' => $payload['procid'],
            'transaction_date' => self::validateTransactionDate($payment)
        ]);
    }

    private function validateTransactionDate($payment)
    {
        if (is_null($payment->transaction_date)) {
            return Carbon::now();
        }

        return $payment->transaction_date;
    }

    private function createPayment($paymentData, $transaction)
    {
        return $transaction->payment()->create([
            'status' => 'P',
            'refno' => $paymentData['refno'],
            'txnid' => $paymentData['txnid'],
            'payment_channel' => 'MPAY',
            'amount' => $transaction->amount,
            'remarks' => 'WAITING FOR PAYMENT'
        ]);
    }



    private function generateTransactionNumber($len = 24)
    {
        $hex = md5(time() . uniqid("", true));

        $pack = pack('H*', $hex);
        $tmp =  base64_encode($pack);

        $uid = preg_replace("#(*UTF8)[^A-Za-z0-9]#", "", $tmp);

        $len = max(4, min(128, $len));

        while (strlen($uid) < $len) {
            $uid .= uniqid();
        }

        $code = strtoupper(substr($uid, 0, $len));

        return $code;
    }

    private function doesTransactionNumberExists($refno)
    {
        $payment = $this->payment->where('txnid', $refno)->count();
        return $payment > 0;
    }

    public function cancelTransactionService($refno)
    {
        $payment = $this->payment->where('refno', $refno)->first();
        if ($payment->status === 'P') {
            $transaction = $payment->transaction->findOrFail($payment->txnid);
            $transaction->status = 'PENDING';
            $transaction->save();
            $payment->status = 'C';
            $payment->remarks = 'CANCELED TRANSACTION';
            $payment->save();

            return 1;
        }
        return 0;
    }
}
