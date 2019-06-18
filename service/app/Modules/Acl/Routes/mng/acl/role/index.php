<?php

Route::group(['middleware' => ['admin']], function () {
    Route::get('/', 'Mng\RoleController@index')
        ->middleware(['role:acl-roles-view']);

    Route::post('/', 'Mng\RoleController@store')
        ->middleware(['role:acl-roles-manage']);
});
