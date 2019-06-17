<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\BranchController@attendancePerBranch');
});