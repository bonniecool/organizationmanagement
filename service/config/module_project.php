<?php

return [
    'request' => [
        'create' => [
            'name',
            'description',
            'mask_name_id',
        ],
        'update' => [
            'name',
            'desciption',
            'mask_name_id',
        ]
    ],
    'constants' => [
        'project' => [
            'mask_name_request' => [
                'status' => [
                    'pending' => 'PENDING',
                    'approved' => 'APPROVED', 
                    'rejected' => 'REJECTED', 
                ]
            ]
        ]
    ]
];
