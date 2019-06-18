<?php

Route::group(['middleware' => ['BranchAdministrator']], function () {
    Route::get('/', 'Mng\Brc\ReminderController@index');
    Route::post('/', 'Mng\Brc\ReminderController@store');
});