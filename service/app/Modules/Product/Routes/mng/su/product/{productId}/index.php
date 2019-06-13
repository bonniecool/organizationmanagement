<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
   Route::get('/', 'Mng\Su\ProductController@show');
   Route::put('/', 'Mng\Su\ProductController@update');
   Route::delete('/', 'Mng\Su\ProductController@delete');
});
