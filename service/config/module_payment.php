<?php

return [
    'channels' => [
        [
            'name' => 'Bayad Center',
            'code' => 'BAYD',
        ],
        [
            'name' => '711',
            'code' => '711',
        ],
        [
            'name' => 'ECPay',
            'code' => 'ECPAY',
        ],
        [
            'name' => 'LBC',
            'code' => 'LBC',
        ]
    ],
    'requests' => [
        'ste' => [
            'payment' => [
                'payment_channel'
            ],
            'received' => [
                'txnid',
                'refno',
                'digest',
                'status',
                'proc_id',
                'message'
            ]
        ],
        'mng' => [
            'listing' => [
                'refno',
                'txnid',
            ],
            'payment' => [
                'pay' => [
                    'status',
                    'refno',
                    'txnid',
                    'transaction_date',
                    'payment_channel',
                    'delivery_type',
                    'amount',
                    'remarks'
                ],
                'update_pay' => [
                    'status',
                    'refno',
                    'txnid',
                    'transaction_date',
                    'payment_channel',
                    'delivery_type',
                    'amount',
                    'remarks'
                ]
            ]
        ],
    ],
    'multipay' => [
        'code' => env('MULTIPAY_CODE'),
        'token' => env('MULTIPAY_TOKEN'),
        'route_name' => env('MULTIPAY_CALLBACK_ROUTE_NAME', 'callback.multipay'),
        'url' => env(
            'MULTIPAY_URL',
            'https://institution.multipay.ph/api/v1/transactions/generate'
        ),
    ],
    'procid' => [
        '711' => '7-Eleven',
        'AUB' => 'Asia United Bank',
        'AUB_OB' => "Asia United Bank Online Banking",
        'BAYD' => 'Bayad Center',
        'BDO' => 'BDO',
        'DBOB' => 'BDO Online Banking',
        'BPI' => 'BPI',
        'BPOB' => 'BPI Online Banking',
        'CEBL' => 'Cebuana Lhuillier',
        'DBP' => 'DBP Visa',
        'DPAY_W' => 'Dragonpay Wallet',
        'EWB' => 'Eastwest Bank',
        'EW_OB' => 'Eastwest Online Banking',
        'ECPY' => 'ECPay',
        'EXPPay' => 'Express Pay',
        'EXPRSPY' => 'EXPRESSPAY',
        'GCASH' => 'GCash',
        'GPAY' => 'GlobalPay',
        'LBP' => 'LandBank',
        'LBP_IACCESS' => 'LandBank iAccess',
        'LBC' => 'LBC',
        'MG' => 'Metro Gaisano',
        'MB' => 'MetroBank',
        'MB_OB' => 'MetroBank Online Banking',
        'multipay_debit_credit' => 'Multipay Debit / Credit',
        'multipay' => 'Multipay Wallet',
        'BC_Netopia' => 'Netopia',
        'PYMY' => 'PayMaya',
        'PYPL' => 'Paypal',
        'BC_PERAHUB' => 'PERAHUB',
        'PNB' => 'Philippine National Bank',
        'PNB_OB' => 'Philippine National Bank Online Banking',
        'RCBC' => 'RCBC',
        'RCBC_OB' => 'RCBC Online Banking',
        'RBP' => 'Robinsons Bills Payment',
        'BC_RBC' => 'Robinsons Business Center',
        'BC_RDS' => 'Robinsons Department Store',
        'SMFA' => 'San Miguel Food Ave.',
        'SB' => 'Security Bank',
        'SB_OB' => 'Security Bank Online Banking',
        'BC_SM_DS' => 'SM - Department Store',
        'BC_SM_SM' => 'SM - Savemore',
        'SMBP' => 'SM Bills Payment',
        'SPDL' => 'Smart Money',
        'STRP' => 'Stripe',
        'EC_TRUMNY' => 'Truemoney',
        'BC_USSC' => 'USSC (WESTER UNION)',
        'BC_VILLARICA' => 'VILLARICA',
        'BC_WALTERMART' => 'WALTERMART DEPT STORE',
    ],
    'constants' => [
        'status' => [
            'draft' => 'D',
            'pending' => 'P',
            'paid' => 'S'
        ],
    ]
];
