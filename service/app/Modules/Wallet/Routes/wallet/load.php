<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::post('/', 'Mng\LoadWalletController@loadWallet');
});

