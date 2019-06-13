<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/', 'Mng\My\ProfileController@profile');
    Route::put('/', 'Mng\My\ProfileController@updateProfile');
    Route::put('/photo', 'Mng\My\ProfileController@updatePhoto');
//    Route::put('/change_password', 'Mng\My\ProfileController@changePassword');
});

