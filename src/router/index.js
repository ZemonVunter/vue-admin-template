import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    name:'login',
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    name: 'video',
    path: '/video',
    component: () => import('@/views/video'),
    hidden: true
  },
  
  //测试页面
  {
    path: '/',
    component: Layout,
    meta: {
      title: '电影观看', //元信息，一级导航的名称
      icon: 'plane' // 元信息，导航图标的名称
    },
    children: [
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/test'),
        meta: {
          title: '最新电影',
        },
      },
      {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
      },
    ]
  },
  {
    path: '/material',
    component: Layout,
    redirect: '/material/upload',
    meta: {
      title: '素材管理', //元信息，一级导航的名称
      icon: 'eye' // 元信息，导航图标的名称
    },
    children: [
      {
        name: 'personalinformation',
        path: '/personalinformation',
        component: () => import('@/views/personalinformation'),
        meta: {
          title: '个人中心',
        },
      },
    ]
  },
  {
    path: '/',
    component: Layout,
    meta: {
      title: '捐赠', //元信息，一级导航的名称
      icon: 'tree' // 元信息，导航图标的名称
    },
    children: [
      {
        path: '/donate',
        name: 'donate',
        component: () => import('@/views/donate/donate'),
        meta: {
          title: '捐赠',
        },
      },
    ]
  },

 
  
  
  

  
  
  // // 素材管理
  // {
  //   path: '/material',
  //   component: Layout,
  //   redirect: '/material/upload',
  //   meta: {
  //     title: '素材管理',
  //     icon: 'plane'
  //   },
  //   children: [{
  //       path: 'check-template',
  //       name: 'check-template',
  //       component: () => import('@/views/material/check-template'),
  //       meta: {
  //         title: '查看模板',
  //       }
  //     },
  //     {
  //       path: 'logo',
  //       name: 'logo',
  //       component: () => import('@/views/material/check-logo'),
  //       meta: {
  //         title: '查看logo',
  //       }
  //     },
  //     {
  //       path: 'generate',
  //       name: 'generate',
  //       component: () => import('@/views/material/generate'),
  //       meta: {
  //         title: '生成素材',
  //       }
  //     },
  //     {
  //       path: 'check',
  //       name: 'check',
  //       component: () => import('@/views/material/check'),
  //       meta: {
  //         title: '查看素材',
  //       }
  //     },
  //   ]
  // },

 
  
  // 404 page must be placed at the end !!!
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
