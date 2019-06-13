<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\ServicePackageController@index');
    Route::post('/', 'Mng\Su\ServicePackageController@store');
});

