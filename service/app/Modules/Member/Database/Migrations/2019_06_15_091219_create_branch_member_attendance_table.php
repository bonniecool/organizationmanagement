<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBranchMemberAttendanceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('branch_member_attendance', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');
            $table->integer('branch_id')->nullable();
            $table->integer('member_id')->unsigned();
            $table->dateTime('attendance_date')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('member_id')->references('id')->on('profile_branch_members')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('branch_member_attendance');
    }
}
