<?php

namespace App\Modules\Member\Repositories;

use App\Modules\Member\Models\Member;

class MemberRepository extends Member
{
    public static function findUuid($data)
    {
        return self::where('uuid', $data);
    }

    public static function createMember($data)
    {
        $payload = self::buildMemberData($data);
        return self::create($payload);
    }

    public static function updateMember($data, $uuid)
    {
        $payload = self::buildMemberData($data);
        $member = self::findUuid($uuid);
        return $member->update($payload);
    }

    public static function buildMemberData($data)
    {
        $payload = $data;
        $payload['branch_id'] = request()->user()->profile->branch_id;
        return $payload;
    }

    public static function checkDuplicate($data)
    {
        $first_name = $data['first_name'] ?? null;
        $middle_name = $data['middle_name'] ?? null;
        $last_name = $data['last_name'] ?? null;;
        $member = self::where('first_name', $first_name)
            ->where('middle_name', $middle_name)
            ->where('last_name', $last_name)
            ->where('birth_date', $data['birth_date']);

        return $member->count();
    }

}
