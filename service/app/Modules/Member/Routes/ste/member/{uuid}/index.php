<?php

Route::get('/', 'Ste\MemberController@show');
Route::put('/', 'Ste\MemberController@registerDevice');
Route::put('/attend', 'Ste\MemberController@attendance');
