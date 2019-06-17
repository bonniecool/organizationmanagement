<?php

namespace App\Modules\Member\Http\Controllers\Mng\Brc;

use Illuminate\Http\Request;
use App\Modules\User\Models\User;
use App\Http\Controllers\Controller;
use Damnyan\Cmn\Services\ApiResponse;
use App\Modules\Member\Http\Resources\Member;
use App\Modules\Member\Http\Requests\MemberRequest;
use App\Modules\Member\Repositories\MemberRepository;
use App\Modules\User\Http\Resources\Profile\SiteUser;
use App\Modules\User\Repositories\SiteUserRepository;
use App\Modules\Member\Http\Resources\MemberCollection;
use App\Modules\User\Http\Resources\Profile\SiteUserCollection;
use App\Modules\Member\Http\Resources\MemberAttendanceCollection;

class MemberController extends Controller
{

    protected $member;

    protected $apiResponse;

    /**
     * MemberController constructor.
     * 
     * @param memberRepository $member [member repo]
     */
    public function __construct(
        MemberRepository $member,
        ApiResponse $apiResponse
    )
    {
        $this->memberRepository = $member;
        $this->apiResponse      = $apiResponse;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function index()
    {
        $branch = request()->user()->profile->branch_id;
        $member = $this->memberRepository
            ->where('branch_id', $branch)
            ->getOrPaginate();
        return $this->apiResponse->resource(new MemberCollection($member));
    }

    /**
     * Display a details of the resource.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function show($uuid)
    {
        $branch = request()->user()->profile->branch_id;
        $member = $this->memberRepository
            ->findUuid($uuid)
            ->where('branch_id', $branch)
            ->firstOrFail();
        return $this->apiResponse->resource(new Member($member));
    }

    /**
     * creation of branch.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function store(MemberRequest $request)
    {
        $payload = $request->only(config('module_member.requests.create'));

        if($this->memberRepository->checkDuplicate($payload))
        {
            return $this->apiResponse->badRequest('This member is already exists.');
        }

        $member = $this->memberRepository->createMember($payload);

        return $this->apiResponse->resource(new Member($member))->additional([
            'message' => 'You have successfully created new member.'
        ]);
    }

    /**
     * update of member.
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function update(MemberRequest $request, $uuid)
    {
        $branch = request()->user()->profile->branch_id;
        $payload = $request->only(config('module_member.requests.update'));
        if(!$this->memberRepository->updateMember($payload, $uuid))
        {
            return $this->apiResponse->badRequest('Something wend wrong. Please try again.');
        }
        $member = $this->memberRepository
            ->findUuid($uuid)
            ->where('branch_id', $branch)
            ->firstOrFail();
        return $this->apiResponse->resource(new Member($member))->additional([
            'message' => 'You have successfully updated this member.'
        ]);
    }

    /**
     * Delete Member
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function delete($uuid)
    {
        $branch = request()->user()->profile->branch_id;
        $member = $this->memberRepository
            ->findUuid($uuid)
            ->where('branch_id', $branch)
            ->firstOrFail();
        $member->delete();
        return $this->apiResponse->resource(new Member($member))->additional([
            'message' => 'You have successfully deleted this member.'
        ]);
    }

    /**
     * member attendance list
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function attendanceList(Request $request)
    {
        $params = $request->only('attendance_date');

        $attendance = $request
            ->user()
            ->profile
            ->branch
            ->attendance()
            ->filter($params)
            ->getOrPaginate();

        return $this->apiResponse->resource(new MemberAttendanceCollection($attendance));
    }

    /**
     * attendance list per member
     *
     * @return \Damnyan\Cmn\Services\ApiResponse;
     */
    public function attendancePerMember(Request $request, $uuid)
    {
        $params = $request->only('attendance_date');

        $branch = request()->user()->profile->branch_id;
        $memberAttendance = $this->memberRepository
            ->findUuid($uuid)
            ->where('branch_id', $branch)
            ->firstOrFail()->attendances()->get();

        return $this->apiResponse->resource(new MemberAttendanceCollection($memberAttendance));
    }
}