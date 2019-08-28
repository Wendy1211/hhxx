import Layout from '@/pages/layout/index'

/* 凭证*/
const AddVoucher = () => import('@/pages/voucher/addVoucher')
const CheckVoucher = () => import('@/pages/voucher/checkVoucher')
const Vsum = () => import('@/pages/voucher/vsum')


/* 账簿 */
const Ledger = () => import('@/pages/account-book/ledger')
const Delaccount = () => import('@/pages/account-book/detail-account')
const Balances = () => import('@/pages/account-book/balances')

/* 报表 */
const Profit = () => import('@/pages/statement/profit')
const Balsheet = () => import('@/pages/statement/balance-sheet')
const Cashflow = () => import('@/pages/statement/cash-flow')

// 固定资产
const Property = () => import('@/pages/fixed-assets/property')

//工资
const Payroll = () => import('@/pages/wage/payroll')

// 结账
const Dispose = () => import('@/pages/settle-accounts/dispose')
const Detection = () => import('@/pages/settle-accounts/detection')

// 设置
const Subject = () => import('@/pages/set/subject')
const Beginning = () => import('@/pages/set/beginning')

// /* 需要权限判断的路由 */
const dynamicRoutes = [
    {
        path: '/voucher',
        component: Layout,
        name: 'Voucher',
        meta: {
            name: '凭证',
            icon: 'el-icon-postcard',
            requiresAuth: true,
        },
        children:[
            {
                path: 'addVoucher',
                component: AddVoucher,
                name: 'AddVoucher',
                meta: {
                    name: '新增凭证',
                    icon: '',
                    keepAlive: false
                },
            },
            {
                path: 'checkVoucher',
                component: CheckVoucher,
                name: 'CheckVoucher',
                meta: {
                    name: '查看凭证',
                    icon: '',
                    keepAlive: false
                },
            },
            {
                path: 'vsum',
                component: Vsum,
                name: 'Vsum',
                meta: {
                    name: '凭证汇总表',
                    icon: '',
                    keepAlive: false
                },
            }
        ]
    },
    {
        path: '/account',
        component: Layout,
        name: 'Account',
        meta: {
            name: '账簿',
            icon: 'el-icon-notebook-2',
            requiresAuth: true,
        },
        children:[
            {
                path: 'ledger',
                component: Ledger,
                name: 'Ledger',
                meta: {
                    name: '总账',
                    icon: ''
                },
            },
            {
                path: 'delaccount',
                component: Delaccount,
                name: 'Delaccount',
                meta: {
                    name: '明细表',
                    icon: ''
                },
            },
            {
                path: 'balances',
                component: Balances,
                name: 'Balances',
                meta: {
                    name: '余额表',
                    icon: ''
                },
            }
        ]
    },
    {
        path: '/statement',
        component: Layout,
        name: 'Statement',
        meta: {
            name: '报表',
            icon: 'el-icon-data-line',
            requiresAuth: true,
        },
        children:[
            {
                path: 'profit',
                component: Profit,
                name: 'Profit',
                meta: {
                    name: '利润表',
                    icon: ''
                },
            },
            {
                path: 'balsheet',
                component: Balsheet,
                name: 'Balsheet',
                meta: {
                    name: '资产负债表',
                    icon: ''
                },
            },
            {
                path: 'cashflow',
                component: Cashflow,
                name: 'Cashflow',
                meta: {
                    name: '现金流量表',
                    icon: ''
                },
            }
        ]
    },
    {
        path: '/assets',
        component: Layout,
        name: 'Assets',
        meta: {
            name: '固定资产',
            icon: 'el-icon-shopping-cart-1',
            requiresAuth: true,
        },
        children:[
            {
                path: 'property',
                component: Property,
                name: 'Property',
                meta: {
                    name: '固定资产管理',
                    icon: ''
                },
            },
        ]
    },
    {
        path: '/wage',
        component: Layout,
        name: 'Wage',
        meta: {
            name: '工资',
            icon: 'el-icon-coin',
            requiresAuth: true,
        },
        children:[
            {
                path: 'payroll',
                component: Payroll,
                name: 'Payroll',
                meta: {
                    name: '工资表',
                    icon: ''
                },
            },
        ]
    },
    {
        path: '/setaccount',
        component: Layout,
        name: 'Setaccount',
        meta: {
            name: '结账',
            icon: 'el-icon-news',
            requiresAuth: true,
        },
        children:[
            {
                path: 'dispose',
                component: Dispose,
                name: 'Dispose',
                meta: {
                    name: '期末处理',
                    icon: ''
                },
            },
            {
                path: 'detection',
                component: Detection,
                name: 'Detection',
                meta: {
                    name: '结账检测',
                    icon: ''
                },
            }
        ]
    },
    {
        path: '/set',
        component: Layout,
        name: 'Set',
        meta: {
            name: '设置',
            icon: 'el-icon-setting',
            requiresAuth: true,
        },
        children:[
            {
                path: 'subject',
                component: Subject,
                name: 'Subject',
                meta: {
                    name: '会计科目',
                    icon: ''
                },
            },
            {
                path: 'beginning',
                component: Beginning,
                name: 'Beginning',
                meta: {
                    name: '科目期初',
                    icon: ''
                },
            }
        ]
    }
]

export default dynamicRoutes
