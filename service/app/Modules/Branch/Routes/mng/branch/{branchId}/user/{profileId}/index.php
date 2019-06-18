<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\BranchController@branchAdminDetails');
    Route::put('/', 'Mng\BranchController@updateBranchAdmin');
    Route::delete('/', 'Mng\BranchController@deleteBranchAdmin');
});