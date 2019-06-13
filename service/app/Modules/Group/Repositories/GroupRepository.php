<?php

namespace App\Modules\Group\Repositories;

use App\Modules\Group\Models\Group;

class GroupRepository extends Group
{
    /**
     * group filter by name
     *
     * @param [type] $query   [query]
     * @param [type] $filters [parameters]
     * @return void
     */
    public function scopeFilter($query, $filters)
    {
        if (!isset($filters['name']) && !is_null($filters['name'])) {
            $query = $query->where('name', 'LIKE', '%'.$filters['name'].'%');
        }
    }
}