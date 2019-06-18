<?php

Route::group(['middleware' => ['siteuser']], function () {
    Route::get('/', 'Ste\RoleController@index')
        ->middleware(['role:organziation-acl-roles-view']);

    Route::post('/', 'Ste\RoleController@store')
        ->middleware(['role:organziation-acl-roles-manage']);
});
