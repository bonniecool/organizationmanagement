<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\AdministratorController@index');
    Route::post('/', 'Mng\Su\AdministratorController@store');
    Route::get('/{id}', 'Mng\Su\AdministratorController@show');
    Route::put('/{id}', 'Mng\Su\AdministratorController@update');
    Route::post('/{id}', 'Mng\Su\AdministratorController@activate');
    Route::post('/{id}', 'Mng\Su\AdministratorController@deactivate');
});

