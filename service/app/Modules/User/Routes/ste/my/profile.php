<?php

Route::group(['middleware' => ['SiteUser']], function () {
    Route::get('/', 'Ste\My\ProfileController@profile');
    Route::put('/', 'Ste\My\ProfileController@updateProfile');
    Route::put('/photo', 'Ste\My\ProfileController@updatePhoto');
//    Route::put('/change_password', 'Ste\ProfileController@changePassword');
});

