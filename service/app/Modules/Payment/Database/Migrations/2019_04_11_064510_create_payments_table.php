<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->increments('id');
//            $table->integer('transaction_id')->unsigned();
            $table->integer('appointment_id')->nullable();
            $table->string('delivery_type', 32)->nullable();
            $table->string('refno', 32)->nullable();
            $table->string('txnid', 50)->unique()->index();
            $table->dateTime('transaction_date')->nullable();
            $table->string('payment_channel', 32)->nullable();
            $table->decimal('amount', 8, 2)->nullable();
            $table->string('status', 26)->nullable();
            $table->text('remarks')->nullable();
            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->nullableTimestamps();
            $table->softDeletes();
            $table->foreign('txnid')->references('txnid')->on('transactions')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
