<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\GroupController@show');
    Route::put('/', 'Mng\Su\GroupController@update');
    Route::delete('/', 'Mng\Su\GroupController@delete');
    Route::put('/attach', 'Mng\Su\GroupController@attach');
    Route::post('/activate', 'Mng\Su\GroupController@activate');
    Route::post('/deactivate', 'Mng\Su\GroupController@deactivate');
    Route::put('/detach', 'Mng\Su\GroupController@detach');
});
  