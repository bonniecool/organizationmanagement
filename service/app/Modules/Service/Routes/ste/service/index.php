<?php

Route::group(['middleware' => ['SiteUser']], function () {
    Route::get('/', 'Ste\ServiceController@index');
});

