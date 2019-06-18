<?php

Route::group(['middleware' => ['siteuser']], function () {
    Route::get('/', 'Ste\ModuleGroupController@index')->middleware(['role:acl-roles-view']);
    Route::get('{moduleGroupCode}', 'Ste\ModuleGroupController@show')->middleware(['role:acl-roles-view']);
});
