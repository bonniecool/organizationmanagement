<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\TransactionTicketController@index');
});

