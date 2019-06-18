<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\PaymentController@index');
    Route::get('/{id}', 'Mng\Su\PaymentController@show');
});
