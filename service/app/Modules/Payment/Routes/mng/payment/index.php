<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\PaymentController@index');
    Route::get('/{txnid}', 'Mng\PaymentController@show');
});
