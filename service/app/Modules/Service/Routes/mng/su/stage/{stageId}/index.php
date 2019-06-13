<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
//    Route::get('/', 'Mng\Su\StageController@show');
//    Route::put('/', 'Mng\Su\StageController@update');
//    Route::delete('/', 'Mng\Su\StageController@delete');
    Route::post('/attach', 'Mng\Su\StageGroupController@attach')->name('xxxxxx');
    Route::post('/detach', 'Mng\Su\StageGroupController@detach')->name('xxxxxx');
    Route::put('/arrange', 'Mng\Su\StageGroupController@arrange')->name('xxxxxx');
});
