<?php

Route::group(['middleware' => ['BranchAdministrator']], function () {
    Route::get('/', 'Mng\Brc\MemberController@index');
    Route::post('/', 'Mng\Brc\MemberController@store');
});