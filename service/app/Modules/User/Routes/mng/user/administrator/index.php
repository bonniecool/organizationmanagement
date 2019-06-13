<?php

Route::group(['middleware' => ['admin']], function () {
    Route::get('/', 'Mng\AdministratorController@index');
        // ->middleware(['role:user:Administrator|user-user-view']);
    Route::post('/', 'Mng\AdministratorController@store');
        // ->middleware(['role:user:Administrator|user-user-manage']);

    Route::group(['prefix' => '{userId}'], function () {
        Route::get('/', 'Mng\AdministratorController@show');
            // ->middleware(['role:user:Administrator|user-user-view']);
        Route::put('/', 'Mng\AdministratorController@update');
            // ->middleware(['role:user:Administrator|user-user-manage']);
        Route::delete('/', 'Mng\AdministratorController@destroy');
            // ->middleware(['role:user:Administrator|user-user-manage']);
        Route::get('reset_password', 'Mng\AdministratorController@resetPassword');
            // ->middleware(['role:user:Administrator|user-user-reset-password']);
        Route::put('/status', 'Mng\AdministratorController@changeStatus');
            // ->middleware(['role:user:Administrator|user-user-manage']);
    });
});
