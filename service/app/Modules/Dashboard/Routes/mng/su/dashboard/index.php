<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/total_organization', 'Mng\Su\DashboardController@totalOrganization');
    Route::get('/member_per_organization', 'Mng\Su\DashboardController@memberPerOrganization');
    Route::get('/organization_per_type', 'Mng\Su\DashboardController@organizationPerType');
});