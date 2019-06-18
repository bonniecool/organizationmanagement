<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\BranchController@branchAdminList');
    Route::post('/', 'Mng\BranchController@createBranchAdmin');
});