<?php

Route::group(['middleware' => ['BranchAdministrator']], function () {
    Route::get('/', 'Mng\Brc\ReminderController@index');
    Route::post('/', 'Mng\Brc\ReminderController@store');
    Route::get('/{id}', 'Mng\Brc\ReminderController@show');
    Route::put('/{id}', 'Mng\Brc\ReminderController@update');
    Route::delete('/{id}', 'Mng\Brc\ReminderController@delete');
    Route::post('/{id}/send', 'Mng\Brc\ReminderController@sendAll');
});