<?php

Route::group(
    ['middleware' => ['siteuser']], function () {
        // Route::get('/', 'Ste\DashboardController@index');
        // Route::get('/plan', 'Ste\DashboardController@plan');
        Route::get('/message', 'Ste\DashboardController@message');
    }
);
