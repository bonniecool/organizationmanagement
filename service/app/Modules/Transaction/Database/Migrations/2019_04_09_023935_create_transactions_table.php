<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('profile_site_user_id')->unsigned()->nullable();
            $table->integer('service_id')->unsigned()->nullable();
            $table->string('txnid', 50)->unique();
            $table->decimal('amount')->nullable();
            $table->enum('status', ['DRAFT', 'PENDING', 'PAID', 'CANCELLED'])->default('DRAFT');
            $table->text('remarks')->nullable();
            $table->string('payment_gateway_type', 64)->default('MULTIPAY')->nullable();
            $table->string('payment_gateway_ref_no', 64)->nullable();
            $table->datetime('payment_gateway_datetime')->nullable();
            $table->string('digest', 64)->nullable();
            $table->integer('created_by')->nullable()->unsigned();
            $table->integer('updated_by')->nullable()->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('profile_site_user_id')->references('id')->on('profile_site_users')->onDelete('cascade');
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('SET NULL');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
