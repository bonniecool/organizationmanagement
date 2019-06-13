<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    //      All stage related to service
    Route::put('/attach', 'Mng\Su\ServiceStageController@attach')->name('service x group');
    Route::put('/detach', 'Mng\Su\ServiceStageController@detach')->name('service x group');
    Route::put('{stageId}/arrange', 'Mng\Su\ServiceStageController@arrange')->name('service x group');
    //      Service group CRUD
    Route::get('/', 'Mng\Su\ServiceStageController@index')->name('service stage crud');
    Route::post('/', 'Mng\Su\ServiceStageController@store')->name('service stage crud');
    Route::get('/{stageId}', 'Mng\Su\ServiceStageController@show')->name('service stage crud');
    Route::put('/{stageId}', 'Mng\Su\ServiceStageController@update')->name('service stage crud');
    Route::delete('/{stageId}', 'Mng\Su\ServiceStageController@delete')->name('service stage crud');
});

