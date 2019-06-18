<?php

Route::group(['middleware' => ['role:user:Administrator|acl-roles-view']], function () {
    Route::get('/', 'Mng\ModuleGroupController@index');
    Route::get('{moduleGroupCode}', 'Mng\ModuleGroupController@show');
});
