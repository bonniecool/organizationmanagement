<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\ServiceController@index');
    Route::post('/', 'Mng\Su\ServiceController@store');
    Route::get('/{id}', 'Mng\Su\ServiceController@show');
    Route::put('/{id}', 'Mng\Su\ServiceController@update');
    Route::delete('/{id}', 'Mng\Su\ServiceController@delete');
});

