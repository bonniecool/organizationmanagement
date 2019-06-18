<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveRouteToAclPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('acl_permissions', function (Blueprint $table) {
            $table->dropColumn('route');
            $table->text('description')->nullable();
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
            $table->string('route', 100)->nullable();
            $table->dropColumn('description');
        });
    }
}
