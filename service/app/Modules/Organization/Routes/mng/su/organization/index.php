<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\OrganizationController@index');
});