<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::put('/attach', 'Mng\Su\ServicePackageController@attach');
    Route::put('/detach', 'Mng\Su\ServicePackageController@detach');
});

