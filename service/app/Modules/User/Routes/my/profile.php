<?php

Route::group(
    ['middleware' => ['SiteUser']], function () {
        Route::get('/', 'My\ProfileController@show');
        Route::put('/', 'My\ProfileController@updateProfile');
        Route::put('/photo', 'My\ProfileController@updatePhoto');
    }
);
