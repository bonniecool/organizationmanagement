<?php

Route::group(['middleware' => ['BranchAdministrator']], function () {
    Route::get('/', 'Mng\Brc\SmsLogsController@index');
    Route::get('/{id}', 'Mng\Brc\SmsLogsController@show');
});