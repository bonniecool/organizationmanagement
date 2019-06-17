<?php

Route::group(['middleware' => ['Administrator']], function () {
    Route::get('/total_branch', 'Mng\DashboardController@totalBranches');
    Route::get('/member_per_branch', 'Mng\DashboardController@memberPerBranch');
    Route::get('/active_branch', 'Mng\DashboardController@activeInactiveBranch');
});