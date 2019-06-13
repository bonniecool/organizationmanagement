<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrganizationProfileSiteUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('profile_site_users', function (Blueprint $table) {
            $table->enum('gender', ['MALE','FEMALE'])->after('last_name')->nullable();
            $table->boolean('is_organization_admin')->default(0)->after('last_name')->nullable();
            $table->integer('organization_id')->unsigned()->after('last_name')->nullable();
            $table->foreign('organization_id')->references('id')->on('organizations')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('profile_site_users', function (Blueprint $table) {
            $table->dropColumn('gender');
            $table->dropColumn('is_organization_admin');
            $table->dropColumn('organization_id');
        });
    }
}
