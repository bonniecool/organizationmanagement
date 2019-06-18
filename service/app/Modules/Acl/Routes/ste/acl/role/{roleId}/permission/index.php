<?php

Route::group(['middleware' => ['siteuser']], function () {
    Route::put('attach', 'Ste\RoleController@attachPermission')
        ->middleware(['role:organziation-acl-roles-manage-permissions']);
    Route::put('detach', 'Ste\RoleController@detachPermission')
        ->middleware(['role:organziation-acl-roles-manage-permissions']);
    Route::put('sync', 'Ste\RoleController@syncPermission')
        ->middleware(['role:organziation-acl-roles-manage-permissions']);
});
