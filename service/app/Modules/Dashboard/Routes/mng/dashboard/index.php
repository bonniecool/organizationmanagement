<?php

Route::group(
    ['middleware' => ['admin']], function () {
        Route::get('/', 'Mng\DashboardController@index');
        Route::get('/plan', 'Mng\DashboardController@plan');
        Route::get('/message', 'Mng\DashboardController@message');
    }
);
