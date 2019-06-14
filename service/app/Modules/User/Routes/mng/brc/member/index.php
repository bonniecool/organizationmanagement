<?php

Route::group(['middleware' => ['BranchAdministrator']], function () {
    Route::get('/', 'Mng\Brc\Controller@profile');
//    Route::put('/', 'Mng\Brc\My\ProfileController@updateProfile');
//    Route::put('/photo', 'Mng\Brc\My\ProfileController@updatePhoto');
//    Route::put('/change_password', 'Mng\Brc\My\ProfileController@changePassword');
});

