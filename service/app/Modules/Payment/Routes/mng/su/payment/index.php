<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\Su\PaymentController@index');
    Route::post('/', 'Mng\Su\PaymentController@show');
});
