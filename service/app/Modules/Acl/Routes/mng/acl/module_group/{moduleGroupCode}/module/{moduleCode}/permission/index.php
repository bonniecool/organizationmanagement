<?php

Route::get('/', 'Mng\PermissionController@index');
Route::get('{permissionCode}', 'Mng\PermissionController@show');
