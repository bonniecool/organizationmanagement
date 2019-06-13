<?php

Route::group(['middleware' => ['SiteUser']], function () {
    Route::get('/', 'Ste\ServiceController@myTransactions');
    Route::get('/{id}', 'Ste\ServiceController@myTransaction');
});

