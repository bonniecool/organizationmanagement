<?php

Route::post('forgot', 'PasswordController@forgot');
Route::post('reset', 'PasswordController@reset')->name('password.reset');
