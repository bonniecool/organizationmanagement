<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEnumStatusResubmitTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \DB::statement("ALTER TABLE transactions MODIFY COLUMN status ENUM('DRAFT','PENDING','RESUBMIT','PAID','DISAPPROVED')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \DB::statement("ALTER TABLE transactions MODIFY COLUMN status ENUM('DRAFT','PENDING','PAID','CANCELLED')");
    }
}
