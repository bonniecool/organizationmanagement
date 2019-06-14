<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\BranchController@index');
    Route::post('/', 'Mng\BranchController@store');
});

