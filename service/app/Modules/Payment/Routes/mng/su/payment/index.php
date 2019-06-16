<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\Su\PaymentController@index');
    Route::get('/', 'Mng\Su\PaymentController@show');
});
