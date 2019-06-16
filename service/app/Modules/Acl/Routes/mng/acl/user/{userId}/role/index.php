<?php

Route::group(['middleware' => ['admin']], function () {
    Route::get('/', 'Mng\UserRoleController@index')
        ->middleware(['role:acl-roles-view']);
    Route::put('attach', 'Mng\UserRoleController@attach')
        ->middleware(['role:acl-role-user-manage']);
    Route::put('detach', 'Mng\UserRoleController@detach')
        ->middleware(['role:acl-role-user-manage']);
    Route::put('sync', 'Mng\UserRoleController@sync')
        ->middleware(['role:acl-role-user-manage']);
});
