<?php

Route::get('/', 'Mng\ModuleController@index');
Route::get('{moduleCode}', 'Mng\ModuleController@show');