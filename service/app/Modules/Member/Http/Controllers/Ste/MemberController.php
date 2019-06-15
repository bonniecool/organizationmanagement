<?php

namespace App\Modules\Member\Http\Controllers\Ste;

use App\Modules\Member\Http\Requests\AttendRequest;
use App\Modules\Member\Http\Requests\RegisterDeviceRequest;
use App\Modules\Member\Http\Resources\Member;
use App\Modules\Member\Http\Resources\MemberAttendance;
use App\Modules\Member\Http\Resources\MemberAttendanceCollection;
use App\Modules\Member\Repositories\MemberAttendanceRepository;
use App\Modules\Member\Repositories\MemberRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use Illuminate\Support\Facades\Hash;

class MemberController extends Controller
{

    protected $member;

    protected $attendance;

    protected $apiResponse;

    /**
     * MemberController constructor.
     *
     * @param memberRepository $member [member repo]
     */
    public function __construct(
        MemberRepository $member,
        ApiResponse $apiResponse,
        MemberAttendanceRepository $attendance
    )
    {
        $this->memberRepository = $member;
        $this->attendance = $attendance;
        $this->apiResponse      = $apiResponse;
    }

    /**
     * Display a details of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show(Request $request, $uuid)
    {
        $member = $this->memberRepository
            ->findUuid($uuid)->firstOrFail();

        return $this->apiResponse->resource(new Member($member));
    }

    /**
     * Register on mobile device
     * @param Request $request
     * @param $uuid
     */
    public function registerDevice(RegisterDeviceRequest $request, $uuid)
    {
        $payload = $request->only('mac_address', 'has_logged', 'pin', 'longitude', 'latitude');
        $payload['pin'] = bcrypt($payload['pin']);
        $member = $this->memberRepository
            ->findUuid($uuid)->firstOrFail();

        $member->update($payload);
        return $this->apiResponse->resource(new Member($member->fresh()));
    }

    /**
     * set pin on mobile device
     * @param Request $request
     * @param $uuid
     */
    public function attendance(AttendRequest $request, $uuid)
    {
        $data = $request->only('pin');

        $member = $this->memberRepository
            ->findUuid($uuid)
            ->firstOrFail();

        if(!Hash::check($data['pin'], $member->pin))
        {
            return $this->apiResponse->badRequest('Incorrect Pin.');
        }
        $payload = [
            'uuid' => $member->uuid,
            'branch_id' => $member->branch_id,
            'attendance_date' => now()
        ];
        $attendance = $this->attendance
            ->create($payload);

        return $this->apiResponse->resource(
            new MemberAttendance($attendance))->additional([
                'message' => 'You have successfully logged in.'
        ]);
    }


}