<?php

return [
    'request' => [
        'SuperAdmin' => [
            'update' => [
                'first_name' => 'required',
                'middle_name' => '',
                'last_name' => 'required',
                'gender' => 'required',
                'birth_date' => 'required',
                'photo' => '',
                'mobile_number' => '',
            ],
        ],
        'Administrator' => [
            'create' => [
                'email',
                'password',
                'first_name',
                'middle_name',
                'last_name',
                'gender',
                'birth_date',
                'photo',
                'mobile_number',
            ],
            'update' => [
                'first_name' => 'required',
                'middle_name' => '',
                'last_name' => 'required',
                'gender' => 'required',
                'birth_date' => 'required',
                'photo' => '',
                'mobile_number' => 'required',
            ],
        ],
        'SiteUser' => [
            'register' => [
                'email',
                'password',
                'first_name',
                'middle_name',
                'last_name',
                'mobile_number',
                'suffix',
                'photo',
                'name',
                'organization_name',
                'is_organization_admin'
            ],
            'create' => [
                'email' => 'required|email',
                'password' => 'required',
                'first_name' => 'required',
                'middle_name' => '',
                'last_name' => 'required',
                'mobile_number' => '',
                'suffix' => '',
                'photo' => '',
            ],
            'update' => [
                'first_name' => 'required',
                'middle_name' => '',
                'last_name' => 'required',
                'mobile_number' => 'required',
                'suffix' => '',
                'photo' => 'required',
                'organization_name' => '',
                'is_organization_admin' => 'integer',
            ],
        ],
    ],
    'constants' => [
        'user_types' => [
            'superadmin' => 'SuperAdmin',
            'administrator' => 'Administrator',
            'branchadmin' => 'BranchAdministrator',
            'siteuser' => 'SiteUser',
        ],
    ],
    'mng_login' => [
        'Administrator',
        'BranchAdministrator',
        'SuperAdmin',
    ],
    'ste_login' => [
        'SiteUser',
    ],
    'change_password' => [
        'current_password',
        'new_password',
        'new_password_confirmation'
    ],
];
