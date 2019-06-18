<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProfileBranchAdministratorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profile_branch_administrators', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('branch_id')->unsigned();
            $table->string('uuid')->unique();
            $table->string('first_name', 64);
            $table->string('middle_name', 64)->nullable();
            $table->string('last_name', 64);
            $table->enum('gender', ['MALE', 'FEMALE'])->nullable();
            $table->date('birth_date')->nullable();
            $table->string('suffix', 8)->nullable();
            $table->string('mobile_number', 32)->nullable();
            $table->string('photo', 256)->nullable();

//            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');
        }
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profile_branch_administrators');
    }
}
