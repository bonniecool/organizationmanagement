<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\OrganizationController@show');
    // Route::put('/', 'Mng\Su\OrganizationController@update');
    Route::delete('/', 'Mng\Su\OrganizationController@delete');
});