<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\QuestionaireController@index');
    Route::post('/', 'Mng\Su\QuestionaireController@store');
    Route::get('/{id}', 'Mng\Su\QuestionaireController@show');
    Route::put('/{id}', 'Mng\Su\QuestionaireController@update');
    Route::delete('/{id}', 'Mng\Su\QuestionaireController@delete');
});

