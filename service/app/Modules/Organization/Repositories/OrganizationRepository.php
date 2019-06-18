<?php

namespace App\Modules\Organization\Repositories;

use App\Modules\Organization\Models\Organization;

class OrganizationRepository extends Organization
{
    /**
     * create profile
     *
     * @param array $data description
     * @return void
     */
    public static function createOrganization($data)
    {
        $data['name'] = isset($data['organization_name']) ?? $data['organization_name'];
        return self::create($data);
    }
}
