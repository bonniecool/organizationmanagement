<?php

Route::group(['middleware' => ['admin']], function () {
    Route::get('/', 'Mng\RoleController@show')
        ->middleware(['role:acl-roles-view']);
    Route::put('/', 'Mng\RoleController@update')
        ->middleware(['role:acl-roles-manage']);
    Route::delete('/', 'Mng\RoleController@destroy')
        ->middleware(['role:acl-roles-manage']);
});
