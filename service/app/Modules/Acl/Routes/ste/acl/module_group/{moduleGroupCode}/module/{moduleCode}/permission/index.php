<?php

Route::group(['middleware' => ['siteuser']], function () {
    Route::get('/', 'Ste\PermissionController@index')->middleware(['role:acl-roles-view']);
    Route::get('{permissionCode}', 'Ste\PermissionController@show')->middleware(['role:acl-roles-view']);
});
