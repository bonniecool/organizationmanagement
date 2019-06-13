<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
   Route::get('/', 'Mng\Su\ProductController@index');
   Route::post('/', 'Mng\Su\ProductController@store');
});
