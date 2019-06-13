<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::put('/arrange', 'Mng\Su\StageGroupController@arrange')->name('xxxxxx');
});
