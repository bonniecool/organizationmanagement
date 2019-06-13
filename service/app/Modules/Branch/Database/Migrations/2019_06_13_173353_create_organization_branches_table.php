<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrganizationBranchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organization_branches', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('organization_id');
            $table->string('uuid');
            $table->string('name');
            $table->string('region_code', '16')->nullable();
            $table->string('province_code', '16')->nullable();
            $table->string('municipality_code', '16')->nullable();
            $table->string('barangay_code', '16')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('street')->nullable();
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->integer('is_active')->default(0);
            $table->softDeletes();

            $table->foreign('region_code')->references('code')->on('regions')->onDelete('cascade');
            $table->foreign('province_code')->references('code')->on('provinces')->onDelete('cascade');
            $table->foreign('municipality_code')->references('code')->on('municipalities')->onDelete('cascade');
            $table->foreign('barangay_code')->references('code')->on('barangays')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('organization_branches');
    }
}
