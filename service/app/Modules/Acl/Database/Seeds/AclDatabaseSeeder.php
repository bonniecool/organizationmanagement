<?php

namespace App\Modules\Acl\Database\Seeds;

use Illuminate\Database\Seeder;
use App\Modules\Acl\Models\Module;
use App\Modules\Acl\Models\ModuleGroup;
use App\Modules\Acl\Models\Permission;

class AclDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        \DB::table('acl_module_groups')->truncate();
        \DB::table('acl_modules')->truncate();
        \DB::table('acl_permission_role')->truncate();
        \DB::table('acl_permissions')->truncate();

        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');


        $data = config('module_acl.module_groups');
        $this->createAcl($data);
    }

    public function createAcl($data)
    {
        foreach ($data as $code => $d) {
            $mg = new ModuleGroup;
            $mg->code = $code;
            $mg->name = $d['name'];
            $mg->profile_type = $d['profile_type'];
            $mg->save();
            $this->createModules($mg, $d['modules']);
        }
    }

    public function createModules($moduleGroup, $modules)
    {
        foreach ($modules as $code => $module) {
            $mod = new Module;
            $mod->code = $code;
            $mod->name = $module['name'];
            $mod->moduleGroup()->associate($moduleGroup);
            $mod->save();
            $this->createPermissions($mod, $module['permissions']);
        }
    }

    public function createPermissions($module, $permissions)
    {
        foreach ($permissions as $code => $permission) {
            $perm = new Permission;
            $perm->code = $code;
            $perm->name = $permission['name'];
            $perm->description = isset($permission['description'])?$permission['description']:null;
            $perm->module()->associate($module);
            $perm->save();
        }
    }
}
