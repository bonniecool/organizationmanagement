<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\BranchController@show');
    Route::put('/', 'Mng\BranchController@update');
    Route::delete('/', 'Mng\BranchController@delete');
});

