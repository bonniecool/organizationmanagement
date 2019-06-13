<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAclPermissionRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('acl_permission_role', function (Blueprint $table) {
            $table->string('acl_permission_code', 100)->nullable();
            $table->foreign('acl_permission_code')->references('code')->on('acl_permissions');

            $table->integer('acl_role_id')->unsigned()->nullable();
            $table->foreign('acl_role_id')->references('id')->on('acl_roles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('acl_permission_role');
    }
}
