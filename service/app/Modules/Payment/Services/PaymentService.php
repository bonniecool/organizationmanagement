<?php

namespace App\Modules\Payment\Services;

use Carbon\Carbon;
use Multipay\Multipay;
use Illuminate\Support\Facades\DB;
use App\Modules\Payment\Repositories\PaymentRepository;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class PaymentService
{
    protected $payment;
    protected $transaction;

    public function __construct(
        PaymentRepository $payment
    ) {
        $this->payment     = $payment;
    }

    public function process($organization, $data)
    {
        DB::beginTransaction();
        $amount = $data['amount'] ?? 0;

        if (!$paymentData = self::generateMultipayReferenceNumber($organization, $amount)) {
            return false;
        }

        if (!$payment = $this->payment->createPayment($paymentData, $data)) {
            return false;
        }

        DB::commit();
        return $payment;
    }

    public function processViaPgi($organization, $data)
    {
        DB::beginTransaction();

        $data['txnid'] = self::generateTransactionNumber(20);
        if (!$payment = $this->payment->createPayment($data)) {
            return false;
        }

        if (!$paymentData = self::generateMultipayPgi($organization, $payment)) {
            return false;
        }

        DB::commit();
        return $paymentData;
    }

    private static function generateMultipayPgi($organization, $payment)
    {
        $multiPay = new MultipayPgi();
        $transaction = $multiPay->generate([
            'amount' => $payment['amount'] ?? 0,
            'txnid' => $payment->txnid,
            'name' => $payment->organization->name,
            'email' => 'janreyguyjoco@gmail.com',
            'mobile' => $payment->organization->mobile_number,
            'callback_url' => 'https://b2c2c69b.ngrok.io/payment/receive'//secure_url('payment/receive')
        ]);

        if (is_null($transaction)) {
            throw new BadRequestHttpException('Failed to generate reference number');
        }

        if ($transaction['status'] >= 400) {
            throw new BadRequestHttpException(json_encode($transaction));
        }

        return $transaction['data'];
    }

    private function generateMultipayReferenceNumber($organization, $amount)
    {
        $multiPay = new Multipay(config('multipay.code'), config('multipay.token'));
        $txnid = self::generateTransactionNumber(20);
        $transaction = $multiPay->generate([
            'code' => config('multipay.code'),
            'token' => config('multipay.token'),
            'name' => $organization->name,
            'amount' => $amount,
            'txnid' => $txnid,
            'mobile' => $organization->mobile_number,
            'email' => 'janreyguyjoco@gmail.com', //$organization->user->email,
            'channel' => 'MPAY',
            'callback_url' => secure_url('payment/receive')
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
        return $payment->update([
            'refno' => $payload['refno'],
            'status' => $payload['status']
        ]);
    }

    public function replenishLoad($payment, $payload)
    {
        $amount = $payment->organization->loadWallet->amount ?? 0;
        return $payment->organization->loadWallet()->updateOrCreate([
            'organization_id' => $payment->organization_id
        ],
            [
                'amount' => $amount + $payment->amount
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
