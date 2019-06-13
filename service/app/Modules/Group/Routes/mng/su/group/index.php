<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\GroupController@index');
    Route::post('/', 'Mng\Su\GroupController@store');
});
