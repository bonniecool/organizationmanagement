<?php

Route::group(['middleware' => ['SiteUser']], function () {
    Route::post('/initial', 'Ste\ServiceController@initial');
    Route::get('/', 'Ste\ServiceController@show');
});

