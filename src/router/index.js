import { createRouter, createWebHashHistory ,createWebHistory} from 'vue-router'
// import login from '../views/login.vue'
const routes = [
    {
        path: "/",
        redirect: "/main"
    },
    {
        path: '/main',
        name: 'main',
        meta:{"icon":"Houese"},
        component: ()=>import('../layout/main.vue'),
        children:[
            {
                path:'/main',
                name:'仪表盘',
                component: ()=>import('../views/home.vue')
            },
            {   
                name:'管理员',
                path:'/admin',
                children:[
                    {
                        meta:{icon:"House"},
                        path:'/authority',
                        name:'角色管理',
                        component:()=>import('../views/authority.vue')
                    },
                    {
                        path:'/user',
                        name:'用户管理',
                        component:()=>import('../views/user.vue')
                    }
                ]
            },
            {
                path:'/systemtools',
                name:'系统工具',
                children:[
                    {
                        path:'/formCreate',
                        name:'表单生成',
                        component:()=>import('../views/formCreate.vue')
                    },
                    {
                        path:'/media',
                        name:'媒体库',
                        component:()=>import('../views/media.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: ()=>import('../views/login.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } else {
        if (localStorage.getItem('token')) {
            next()
        } else {
            next('/login')
        }
    }
})
export default router
