<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\TransactionTicketController@show');
    Route::put('/process', 'Mng\TransactionTicketController@process');
    Route::put('/approve', 'Mng\TransactionTicketController@approve');
    Route::put('/reject', 'Mng\TransactionTicketController@reject');
    Route::put('/resubmit', 'Mng\TransactionTicketController@resubmit');
});

