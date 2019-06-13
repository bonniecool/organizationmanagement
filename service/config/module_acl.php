<?php
return [
    'module_groups' => [
        // 'admin-acl' => [
        //     'name' => 'Admin Access Control List',
        //     'profile_type' => 'Administrator',
        //     'modules' => [
        //         'admin-acl-roles' => [
        //             'name' => 'Admin Roles',
        //             'permissions' => [
        //                 'admin-acl-roles-view' => [
        //                     'name' => 'View',
        //                     'description' => 'View Roles',
        //                 ],
        //                 'admin-acl-roles-manage' => [
        //                     'name' => 'Manage',
        //                     'description' => 'Manage Roles (Create, Update, Delete)'
        //                 ],
        //                 'admin-acl-role-user-manage' => [
        //                     'name' => 'User\'s Role',
        //                     'description' => 'Assign role/s to a user'
        //                 ],
        //                 'admin-acl-roles-manage-permissions' => [
        //                     'name' => 'Permissions',
        //                     'description' => 'Manage Permissions (Attach / Detach permissions to a role)',
        //                 ]
        //             ]
        //         ],
        //     ]
        // ],
        // 'mng-user' => [
        //     'name' => 'User',
        //     'profile_type' => config('module_user.constants.user_types.administrator'),
        //     'modules' => [
        //         'admin-user-user' => [
        //             'name' => 'User Management',
        //             'permissions' => [
        //                 'mng-user-user-view' => [
        //                     'name' => 'View',
        //                     'description' => 'View Users',
        //                 ],
        //                 'mng-user-user-manage' => [
        //                     'name' => 'Manage',
        //                     'description' => 'Manage Users',
        //                 ],
        //                 'mng-user-user-reset-password' => [
        //                     'name' => 'Reset Password',
        //                     'description' => 'Reset password of a user.'
        //                 ]
        //             ],
        //         ],
        //     ],
        // ],
        'organziation-acl' => [
            'name' => 'Organization Access Control List',
            'profile_type' => 'Siteuser',
            'modules' => [
                'organziation-acl-roles' => [
                    'name' => 'Organization Roles',
                    'permissions' => [
                        'organziation-acl-roles-view' => [
                            'name' => 'View',
                            'description' => 'View Roles',
                        ],
                        'organziation-acl-roles-manage' => [
                            'name' => 'Manage',
                            'description' => 'Manage Roles (Create, Update, Delete)'
                        ],
                        'organziation-acl-role-user-manage' => [
                            'name' => 'User\'s Role',
                            'description' => 'Assign role/s to a user'
                        ],
                        'organziation-acl-roles-manage-permissions' => [
                            'name' => 'Permissions',
                            'description' => 'Manage Permissions (Attach / Detach permissions to a role)',
                        ]
                    ]
                ],
            ]
        ],
        'organziation-mask-name' => [
            'name' => 'Organziation Mask Name',
            'profile_type' => 'Siteuser',
            'modules' => [
                'organziation-mask-name' => [
                    'name' => 'Organziation Mask Name',
                    'permissions' => [
                        'organziation-mask-name-view' => [
                            'name' => 'View',
                            'description' => 'View Mask Name',
                        ],
                        'organziation-mask-name-manage' => [
                            'name' => 'Manage',
                            'description' => 'Manage Mask Name (Create, Update, Delete)'
                        ]
                    ]
                ],
            ]
        ],
        'organziation-project' => [
            'name' => 'Organziation Project',
            'profile_type' => 'Siteuser',
            'modules' => [
                'organziation-project' => [
                    'name' => 'Organziation Project',
                    'permissions' => [
                        'organziation-project-view' => [
                            'name' => 'View',
                            'description' => 'View Project',
                        ],
                        'organziation-project-manage' => [
                            'name' => 'Manage',
                            'description' => 'Manage Project (Create, Update, Delete)'
                        ]
                    ]
                ],
                'organziation-project-message' => [
                    'name' => 'Organziation Project Message',
                    'permissions' => [
                        'organziation-project-message-view' => [
                            'name' => 'View',
                            'description' => 'View Project Message',
                        ],
                        // 'organziation-project-message-manage' => [
                        //     'name' => 'Manage',
                        //     'description' => 'Manage Project Message (Create, Update, Delete)'
                        // ]
                    ]
                ],
            ]
        ],
        'organziation-my-project' => [
            'name' => 'Organziation My Project',
            'profile_type' => 'Siteuser',
            'modules' => [
                'organziation-my-project' => [
                    'name' => 'Organziation My Project',
                    'permissions' => [
                        'organziation-my-project-view' => [
                            'name' => 'View',
                            'description' => 'View My Project',
                        ],
                        'organziation-my-project-manage' => [
                            'name' => 'Manage',
                            'description' => 'Manage My Project (Create, Update, Delete)'
                        ]
                    ]
                ],
                'organziation-my-project-message' => [
                    'name' => 'Organziation My Project Message',
                    'permissions' => [
                        'organziation-my-project-message-view' => [
                            'name' => 'View',
                            'description' => 'View My Project Message',
                        ],
                        // 'organziation-project-message-manage' => [
                        //     'name' => 'Manage',
                        //     'description' => 'Manage Project Message (Create, Update, Delete)'
                        // ]
                    ]
                ],
            ]
        ],
        'organziation-mask-name' => [
            'name' => 'Organziation Mask Name',
            'profile_type' => 'Siteuser',
            'modules' => [
                'organziation-mask-name' => [
                    'name' => 'Organziation Mask Name',
                    'permissions' => [
                        'organziation-mask-name-view' => [
                            'name' => 'View',
                            'description' => 'View Mask Name',
                        ],
                        'organziation-mask-name-manage' => [
                            'name' => 'Manage',
                            'description' => 'Manage Mask Name (Create, Update, Delete)'
                        ]
                    ]
                ],
            ]
        ],
        'organziation-wallet' => [
            'name' => 'Organziation Wallet',
            'profile_type' => 'Siteuser',
            'modules' => [
                'organziation-wallet' => [
                    'name' => 'Organziation Wallet',
                    'permissions' => [
                        'organziation-wallet-view' => [
                            'name' => 'View',
                            'description' => 'View Wallet',
                        ]
                    ]
                ],
                'organziation-wallet-logs' => [
                    'name' => 'Organziation Wallet Logs',
                    'permissions' => [
                        'organziation-wallet-logs-view' => [
                            'name' => 'View',
                            'description' => 'View Wallet Logs',
                        ]
                    ]
                ],
            ]
        ],
        'organziation-user' => [
            'name' => 'Organziation User',
            'profile_type' => 'Siteuser',
            'modules' => [
                'organziation-user' => [
                    'name' => 'Organziation User',
                    'permissions' => [
                        'organziation-user-view' => [
                            'name' => 'View',
                            'description' => 'View User',
                        ],
                        'organziation-user-manage' => [
                            'name' => 'Manage',
                            'description' => 'Manage User (Create, Update, Delete)'
                        ]
                    ]
                ],
                'organziation-user-project' => [
                    'name' => 'Organziation User Project',
                    'permissions' => [
                        'organziation-user-project-view' => [
                            'name' => 'View',
                            'description' => 'View User Project',
                        ],
                        'organziation-user-project-manage' => [
                            'name' => 'Manage',
                            'description' => 'Manage User Project (Create, Update, Delete)'
                        ]
                    ]
                ],
            ]
        ],
    ]
];
