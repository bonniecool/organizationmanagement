<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\SmsLogsController@index');
    Route::get('/{id}', 'Mng\SmsLogsController@show');
});