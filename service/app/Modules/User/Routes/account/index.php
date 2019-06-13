<?php

Route::group(
    ['middleware' => []], function () {
        Route::post('/activate', 'AccountActivationController@activate');
        Route::post('/resend', 'AccountActivationController@resendCode');
    }
);

