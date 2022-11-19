export {};
export const BdsType = {
    CHO_THUE_PHONG: 'CHO_THUE_PHONG',
    TIM_PHONG: 'TIM_PHONG',
    SANG_NHUONG: 'SANG_NHUONG',
    VAN_PHONG: 'VAN_PHONG',
    THANH_LY: 'THANH_LY',
    CHO_THUE_NHA: 'CHO_THUE_NHA'
};
export const FB_COOKIE_LC_KEY = 'FB_COOKIE_LC_KEY';
export const FB_GROUP_KEY = 'FB_GROUP_KEY';
export const FB_INVITE_LC_KEY = 'FB_INVITE_LC_KEY';
export const FB_FRIEND_ADD_LC_KEY = 'FB_FRIEND_ADD_LC_KEY';
export const FB_GET_MEM_LC_KEY = 'FB_GET_MEM_LC_KEY';
export const FB_GROUP_ID_LC_KEY = 'FB_GROUP_ID_LC_KEY';
export const FB_TOKEN_LC_KEY = 'FB_TOKEN_LC_KEY';
export const LC_BODY_KEY = 'FRIEND_RC_BODY';
export const BdsTypeArray = [
    {key: 'CHO_THUE_PHONG', value: 'Cho thuê phòng'},
    {key: 'TIM_PHONG', value: 'Tìm phòng'},
    {key: 'SANG_NHUONG', value: 'Sang nhượng'},
    {key: 'VAN_PHONG', value: 'Văn phòng'},
    {key: 'THANH_LY', value: 'Thanh lý'},
    {key: 'CHO_THUE_NHA', value: 'Nhà nguyên căn'},
    {key: 'KHAC', value: 'Khác'},
];

export const MAX_DBS_PRICE = 100000000; // 100tr
export const MID_DBS_PRICE = 20000000; // 20tr

export const BDS_REGEX = [
    {
        'id': 1,
        'name': 'Cho thuê phòng',
        'matched_expressions': [
            '(cho thuê, khoá vân tay)',
            'CCMN&24/7',
            'CCMN&24/24'
        ]
    },
    {
        'id': 2,
        'name': 'Cho thuê nhà nguyên căn',
        'matched_expressions': [
            '(nguyên căn)'
        ]
    },
    {
        'id': 3,
        'name': 'Tìm phòng',
        'matched_expressions': [
            '(Cần tìm phòng, tìm phòng, muốn thuê phòng, tìm phòg, tìm nhà, cần thuê)'
        ],
        'negative_expressions': [
            'nguyên căn'
        ]
    },
    {
        'id': 4,
        'name': 'Sang nhượng',
        'matched_expressions': [
            '(nhượng)'
        ]
    },
    {
        'id': 5,
        'name': 'Văn phòng',
        'matched_expressions': [
            '(văn phòng)'
        ]
    },
    {
        'id': 6,
        'name': 'Thanh lý',
        'matched_expressions': [
            '(thanh  lý , thanh lí)'
        ]
    }
];

export const API_TOKEN_LC_K = 'API_TOKEN_LC_KEY';
