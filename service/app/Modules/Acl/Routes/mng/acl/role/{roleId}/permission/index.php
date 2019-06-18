<?php

Route::group(['middleware' => ['admin']], function () {
    Route::put('attach', 'Mng\RoleController@attachPermission')
        ->middleware(['role:acl-roles-manage-permissions']);
    Route::put('detach', 'Mng\RoleController@detachPermission')
        ->middleware(['role:acl-roles-manage-permissions']);
    Route::put('sync', 'Mng\RoleController@syncPermission')
        ->middleware(['role:acl-roles-manage-permissions']);
});
