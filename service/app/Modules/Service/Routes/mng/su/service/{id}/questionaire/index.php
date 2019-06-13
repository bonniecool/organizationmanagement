<?php

Route::group(['middleware' => ['SuperAdmin']], function () {
    Route::get('/', 'Mng\Su\ServiceQuestionaireController@index');
    Route::put('/attach', 'Mng\Su\ServiceQuestionaireController@attach');
    Route::put('/detach', 'Mng\Su\ServiceQuestionaireController@detach');
    Route::get('/{questionId}', 'Mng\Su\ServiceQuestionaireController@show');
    Route::put('{questionId}/arrange', 'Mng\Su\ServiceQuestionaireController@arrange');
});

