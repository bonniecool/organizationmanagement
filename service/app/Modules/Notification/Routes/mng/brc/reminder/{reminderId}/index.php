 <?php

Route::group(['middleware' => ['BranchAdministrator']], function () {
    Route::get('/', 'Mng\Brc\ReminderController@show');
    Route::put('/', 'Mng\Brc\ReminderController@update');
    Route::delete('/', 'Mng\Brc\ReminderController@delete');
    Route::post('/send', 'Mng\Brc\ReminderController@sendAll');
});