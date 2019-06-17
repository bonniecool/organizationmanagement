<?php

Route::group(['middleware' => ['BranchAdministrator']], function () {
    Route::get('/total_member', 'Mng\Brc\DashboardController@totalMembers');
    Route::get('/member_per_gender', 'Mng\Brc\DashboardController@membersPerGender');
    Route::get('/member_per_user', 'Mng\Brc\DashboardController@membersPerUserType');
    Route::get('/new_member', 'Mng\Brc\DashboardController@newMember');
});