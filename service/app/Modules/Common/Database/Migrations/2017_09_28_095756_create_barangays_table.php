<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBarangaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('barangays', function (Blueprint $table) {
            $table->string('code', 16)->primary();
            $table->string('region_code', 16);
            $table->string('province_code', 16);
            $table->string('municipality_code', 16);
            $table->string('name', 128);
            $table->string('zip_code', 10)->nullable();

            $table->foreign('region_code')->references('code')->on('regions');
            $table->foreign('province_code')->references('code')->on('provinces');
            $table->foreign('municipality_code')->references('code')->on('municipalities');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('barangays');
    }
}
