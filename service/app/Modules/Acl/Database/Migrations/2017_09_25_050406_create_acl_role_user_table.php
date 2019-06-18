<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAclRoleUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('acl_role_user', function (Blueprint $table) {
            $table->integer('acl_role_id')->unsigned()->nullable();
            $table->integer('user_id')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('acl_role_id')->references('id')->on('acl_roles')->onDelete('SET NULL');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('acl_role_user', function (Blueprint $table) {
            // $table->dropForeign('acl_role_user_role_id_foreign');
            // $table->dropForeign('acl_role_user_user_id_foreign');
        });

        Schema::dropIfExists('acl_role_user');
    }
}
