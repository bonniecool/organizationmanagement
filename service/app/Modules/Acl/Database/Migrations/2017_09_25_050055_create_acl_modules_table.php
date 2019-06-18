<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAclModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('acl_modules', function (Blueprint $table) {
            $table->string('code', 100)->unique()->index();
            $table->string('acl_module_group_code', 100)->nullable();
            $table->string('name', 100)->unique();
            
            $table->foreign('acl_module_group_code')->references('code')->on('acl_module_groups');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('acl_modules', function (Blueprint $table) {
            $table->dropForeign('acl_modules_acl_module_group_code_foreign');
        });
        
        Schema::dropIfExists('acl_modules');
    }
}
