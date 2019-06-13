<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\TransactionController@index');
    Route::get('/{transactionId}', 'Mng\Su\TransactionController@show');
});

