<?php

Route::group(['middleware' => ['siteuser']], function () {
    Route::get('/', 'Ste\ModuleController@index')->middleware(['role:acl-roles-view']);
    Route::get('{moduleCode}', 'Ste\ModuleController@show')->middleware(['role:acl-roles-view']);
});