<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\PaymentController@index');
    Route::get('/', 'Mng\Su\PaymentController@show');
});
