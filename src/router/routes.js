// +----------------------------------------------------------------------
// | LightPicture [ 图床 ]
// +----------------------------------------------------------------------
// | 企业团队图片资源管理系统
// +----------------------------------------------------------------------
// | Github: https://github.com/osuuu/LightPicture
// +----------------------------------------------------------------------
// | Copyright © http://picture.h234.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: Team <admin@osuu.net>
// +----------------------------------------------------------------------
const meta = {
    auth: true
};

const frameIn = [{
    path: '/',
    component: () => import("@/views/layout/index.vue"),
    children: [
        {
            path: '',
            name: 'index',
            component: () => import("@/views/index/index.vue"),
            meta: {
                title: '首页',
                icon: 'osuu-net geek-menu_kongzhitai',
                isShow: true,
                isFold: false,
            }
        },
        {
            path: 'gallery',
            name: 'gallery',
            component: () => import("@/views/gallery/index.vue"),
            meta: {
                ...meta,
                title: '图库',
                icon: 'osuu-net geek-yingxiaogongju-zhututubiao',
                isShow: true,
                isFold: false,
            }
        },
        {
            path: 'word',
            name: 'word',
            component: () => import("@/views/word/index.vue"),
            meta: {
                ...meta,
                title: '接口',
                icon: 'osuu-net geek-shuju',
                isShow: true,
                isFold: false,
            }
        },
        {
            path: 'setup',
            name: 'setup',
            component: { render: (e) => e("router-view") },
            meta: {
                title: '系统管理',
                icon: 'osuu-net geek-shezhi',
                isShow: true,
                isFold: true,
            },
            children: [{
                path: 'home',
                name: "setup-home",
                component: () => import("@/views/home/home.vue"),
                meta: {
                    ...meta,
                    title: '概况',
                    isShow:true
                }
            },
            
            {
                path: 'storage',
                name: "setup-storage",
                component: () => import("@/views/setup/storage.vue"),
                meta: {
                    ...meta,
                    title: '存储桶',
                    isShow:true
                }
            },
            {
                path: 'role',
                name: "setup-role",
                component: () => import("@/views/setup/role.vue"),
                meta: {
                    ...meta,
                    title: '角色组',
                    isShow:true
                }
            },
            {
                path: 'member',
                name: "setup-member",
                component: () => import("@/views/setup/member.vue"),
                meta: {
                    ...meta,
                    title: '团队成员',
                    isShow:true
                }
            },
            {
                path: 'admin',
                name: "setup-admin",
                component: () => import("@/views/setup/admin.vue"),
                meta: {
                    ...meta,
                    title: '系统设置',
                    isShow:false
                }
            },

            ]
        },
        {
            path: 'userInfo',
            name: 'userInfo',
            component: () => import("@/views/user/userInfo.vue"),
            meta: {
                ...meta,
                title: '个人资料',
                isShow: false
            }
        },
        {
            path: 'userpwd',
            name: 'userpwd',
            component: () => import("@/views/user/userpwd.vue"),
            meta: {
                ...meta,
                title: '修改密码',
                isShow: false
            }
        },
        {
            path: 'about',
            name: 'about',
            component: () => import("@/views/user/about.vue"),
            meta: {
                ...meta,
                title: '关于系统',
                isShow: false
            }
        },

    ]
},

];




/**
 * 错误页面
 */

const errorPage = [
    {
        path: '*',
        name: '404',
        meta: {
            title: '404'
        },
        component: () => import('@/views/error/404/index.vue')
    },
];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [
    ...frameIn,
    ...errorPage
];