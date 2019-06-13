<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::put('/create_attach', 'Mng\Su\ServicePackageController@createAttach');
});

