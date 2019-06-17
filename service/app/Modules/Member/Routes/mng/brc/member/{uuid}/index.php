<?php

Route::group(['middleware' => ['BranchAdministrator']], function () {
    Route::get('/', 'Mng\Brc\MemberController@show');
    Route::put('/', 'Mng\Brc\MemberController@update');
    Route::delete('/', 'Mng\Brc\MemberController@delete');
    Route::get('/attendance', 'Mng\Brc\MemberController@attendancePerMember');
});