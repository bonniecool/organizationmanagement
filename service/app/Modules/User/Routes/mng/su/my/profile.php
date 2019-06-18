<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\My\ProfileController@profile');
    Route::put('/', 'Mng\Su\My\ProfileController@updateProfile');
    Route::put('/photo', 'Mng\Su\My\ProfileController@updatePhoto');
});

