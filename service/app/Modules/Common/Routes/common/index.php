<?php
    Route::get('/region', 'AddressController@regionList');
    Route::get('/province', 'AddressController@provinceList');
    Route::get('/municipality', 'AddressController@municipalityList');
    Route::get('/barangay', 'AddressController@barangayList');