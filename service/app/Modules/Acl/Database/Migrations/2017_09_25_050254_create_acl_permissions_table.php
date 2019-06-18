<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAclPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('acl_permissions', function (Blueprint $table) {
            $table->string('code', 20)->unique()->index();

            $table->string('acl_module_code', 100)->nullable();
            $table->foreign('acl_module_code')->references('code')->on('acl_modules');

            $table->string('name', 100);
            $table->string('route', 100);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('acl_permissions', function (Blueprint $table) {
            // $table->dropForeign('acl_permissions_module_code_foreign');
        });

        Schema::dropIfExists('acl_permissions');
    }
}
