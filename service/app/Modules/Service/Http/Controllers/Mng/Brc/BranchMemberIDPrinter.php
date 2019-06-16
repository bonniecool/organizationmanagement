<?php

namespace App\Modules\Service\Http\Controllers\Mng\Brc;

use App\Modules\Service\Services\Notification\SmsSender;
use Illuminate\Http\Request;
use App\Modules\Member\Repositories\MemberRepository;
use App\Modules\Service\Services\Pdf\UserProfileIDPdf;


class BranchMemberIDPrinter
{
    public function printProfile(Request $request)
    {
//        return (new SmsSender)->send(
//            [
//                'message' => "hi",
//                'number' => '09174228854',
//            ]
//        );
        $profile = MemberRepository::findUuid($request->uuid)->firstOrFail();
        return (new UserProfileIDPdf())->generate($profile);
    }
}