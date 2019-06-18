<?php

Route::group(['middleware' => ['siteuser']], function () {
    Route::get('/', 'Mng\RoleController@show')
        ->middleware(['role:organziation-acl-roles-view']);
    Route::put('/', 'Mng\RoleController@update')
        ->middleware(['role:organziation-acl-roles-manage']);
    Route::delete('/', 'Mng\RoleController@destroy')
        ->middleware(['role:organziation-acl-roles-manage']);
});
