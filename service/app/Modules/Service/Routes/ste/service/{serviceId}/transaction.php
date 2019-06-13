<?php

Route::group(['middleware' => ['SiteUser']], function () {
    Route::get('/', 'Ste\ServiceController@listServiceTransactions');
    Route::get('/{transactionId}', 'Ste\ServiceController@showServiceTransaction');
    Route::put('/{transactionId}/pending', 'Ste\ServiceController@pending');
    Route::put('/{transactionId}/resubmit', 'Ste\ServiceController@resubmit');
});

