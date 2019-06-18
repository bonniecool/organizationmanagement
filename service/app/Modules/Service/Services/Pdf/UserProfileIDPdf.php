<?php

namespace App\Modules\Service\Services\Pdf;

use Carbon\Carbon;
use Anouar\Fpdf\Fpdf;
use Intervention\Image\Facades\Image;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class UserProfileIDPdf extends Fpdf
{
    protected static $border = 0;

    protected static $valueY = 10;

    protected static $marginSide = 39.9;

    protected $footerData = '';

    public function generate($data)
    {
//        $this->AddPage('L', [85.598, 53.975]);

        $this->AddPage('L', [210, 132.418]);
        $this->SetAutoPageBreak(false);
        $this->setFrontContent($data);
        $this->AddPage('L', [210, 132.418]);
        $this->setBackContent();
        Fpdf::Output();
        exit;
    }

//    public function upload($srn, $payment = [], $idNumber = 111111)
//    {
//        $this->AddPage('L', [85.598, 53.975]);
//        $this->SetAutoPageBreak(false);
//        $this->setFrontContent(self::buildData($srn, $payment, $idNumber));
//        $this->AddPage('L', [85.598, 53.975]);
//        $this->setBackContent();
//        $fileName = md5(Carbon::now().rand(1, 9999)).'.pdf';
//        $this->Output(storage_path('generated/'.$fileName));
//
//        return $fileName;
//    }

    private function setFrontContent($data)
    {
        $this->Image(resource_path('pdf/template/Front.jpg'), 0, 0, 210, 132.418);

        $qrCode = QrCode::format('png')
            ->size(200)
            ->margin(0)
            ->generate($data['uuid']);
        $image = Image::make($qrCode)->encode('data-url');

        $this->Image($image->encoded, 169, 3.8, 35.6, 35.6, 'png');


        if ($data['photo']) {
            $photo = $data['photo'];
            $this->Image($photo, 8, 45, 52, 56.6, 'JPG');
        }

        $this->setXY(63, 54);
        $this->SetFont('Arial', 'B', 18);
        $this->SetTextColor(0, 0, 0);
        $this->Cell(55, 4, "{$data->last_name}, {$data->first_name} {$data->middle_name}", self::$border, 0, 'L');

        $this->setXY(63, 69);
        $this->SetFont('Arial', 'B', 14);
        $this->MultiCell(0, 5, $data->full_address);


        $this->setXY(63, 89);
        $this->SetFont('Arial', 'B', 18);
        $this->SetTextColor(0, 0, 0);
        $this->Cell(55, 4, strtoupper(self::parseDate($data->birth_date)), self::$border, 0, 'L');

        $this->setXY(63, 105);
        $this->SetFont('Arial', 'B', 18);
        $this->SetTextColor(0, 0, 0);
        $this->Cell(55, 4, strtoupper($data->gender), self::$border, 0, 'L');

        $this->setXY(63, 120);
        $this->SetFont('Arial', 'B', 18);
        $this->SetTextColor(0, 0, 0);
        $this->Cell(55, 4, $data->branch->name, self::$border, 0, 'L');

        $this->setXY(108, 120);
        $this->SetFont('Arial', 'B', 18);
        $this->SetTextColor(0, 0, 0);
        $this->Cell(55, 4, $data->mobile_number, self::$border, 0, 'L');

    }
//
    private function setBackContent()
    {
        $this->Image(resource_path('pdf/template/Back.jpg'), 0, 0, 210, 132.418);
    }

    private function parseDate($data)
    {
        return Carbon::parse($data)->format('F d, Y');
    }
}
