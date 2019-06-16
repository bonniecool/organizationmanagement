<?php

Route::group(['middleware' => ['siteuser']], function () {
    Route::get('/', 'Ste\UserRoleController@index')
        ->middleware(['role:acl-roles-view']);
    Route::put('attach', 'Ste\UserRoleController@attach')
        ->middleware(['role:acl-role-user-manage']);
    Route::put('detach', 'Ste\UserRoleController@detach')
        ->middleware(['role:acl-role-user-manage']);
    Route::put('sync', 'Ste\UserRoleController@sync')
        ->middleware(['role:acl-role-user-manage']);
});
