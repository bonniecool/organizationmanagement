<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProfileBranchMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profile_branch_members', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('branch_id')->unsigned();
            $table->uuid('uuid');
            $table->string('pin')->nullable();
            $table->string('first_name', 64);
            $table->string('middle_name', 64)->nullable();
            $table->string('last_name', 64);
            $table->enum('gender', ['MALE', 'FEMALE'])->nullable();
            $table->date('birth_date')->nullable();
            $table->string('suffix', 8)->nullable();
            $table->string('mobile_number', 32)->nullable();
            $table->enum('user_type', ['GUEST', 'MEMBER'])->default('MEMBER');
            $table->string('photo', 256)->nullable();
            $table->string('region_code', '16')->nullable();
            $table->string('province_code', '16')->nullable();
            $table->string('municipality_code', '16')->nullable();
            $table->string('barangay_code', '16')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('street')->nullable();
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->string('mac_address')->nullable();
            $table->boolean('has_logged')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('region_code')->references('code')->on('regions')->onDelete('cascade');
            $table->foreign('province_code')->references('code')->on('provinces')->onDelete('cascade');
            $table->foreign('municipality_code')->references('code')->on('municipalities')->onDelete('cascade');
            $table->foreign('barangay_code')->references('code')->on('barangays')->onDelete('cascade');
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
        Schema::dropIfExists('profile_branch_members');
    }
}
