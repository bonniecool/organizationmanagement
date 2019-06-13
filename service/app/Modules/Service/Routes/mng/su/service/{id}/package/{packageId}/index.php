<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\ServicePackageController@show');
    Route::put('/', 'Mng\Su\ServicePackageController@update');
    Route::delete('/', 'Mng\Su\ServicePackageController@delete');
});

