<?php

namespace App\Modules\Acl\Traits;

trait UserAclTrait
{
    public function can($reqPerms, $params = null)
    {
        if (request()->user()->id == 1) {
            return true;
        }

        $users = $this->getUserType($reqPerms);
        $reqPerms = $this->getPermissions($reqPerms);

        if ($users) {
            if (!in_array(request()->user()->profile_type, $users)) {
                return false;
            }
        }

        if (!$reqPerms) {
            return true;
        }

        foreach ($this->roles as $role) {
            $permissions = $role->permissions();
            $can = $permissions->whereIn('code', $reqPerms)->first();

            if ($can) {
                return true;
            }
        }

        return false;
    }

    public function roles()
    {
        return $this->belongsToMany(
            'App\Modules\Acl\Repositories\RoleRepository',
            'acl_role_user',
            'user_id',
            'acl_role_id'
        )->withTimestamps();
    }

    private function getUserType($permissions)
    {
        $perms = explode('|', $permissions);
        $users = preg_grep('/(user\:)\w+/', $perms);

        if (!$users) {
            return null;
        }

        return array_map(function ($value) {
            return str_replace('user:', '', $value);
        }, $users);
    }

    private function getPermissions($permissions)
    {
        $perms = explode('|', $permissions);

        return array_filter($perms, function ($value) {
            return (preg_match('/(user\:)\w+/', $value))
                ? false
                : true;
        });
    }
}
