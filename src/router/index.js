import { createRouter, createWebHistory } from 'vue-router'
import PostJob from '../views/postjob.vue'
import CreateProfile from '../views/createprofile.vue'
import MySpace from '../views/myspace.vue'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import register from '../views/register.vue'
import forgotPassword from '../views/forgotpassword.vue'
import Edit from '../views/editProfile.vue'
import Preview from '../views/previewPost.vue'
import Apply from '../views/apply.vue'
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import Jobs from '../views/jobs.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Home',
        }
    },
    {
        path: '/post',
        name: 'Post',
        component: PostJob,
        meta: {
            title: 'Post A Job',
        }
    },
    {
        path: '/jobs',
        name: 'jobs',
        component: Jobs,
        children: [
            
        ],
        meta: {
            title: 'SelinJobs',
        }
    },
    {
        path: '/preview',
        name: 'Preview',
        component: Preview,
        meta: {
            title: 'Preview Post',
        }
    },
    {
        path: '/edit-profile',
        name: 'change',
        component: Edit,
        meta: {
            title: 'Change',
        }
    },
    {
        path: '/apply/:id',
        name: 'Apply',
        component: Apply,
        meta: {
            title: 'Interested',
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Login',
        }
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
            title: 'register',
        }
    },
    {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: forgotPassword,
        meta: {
            title: 'Get it',
        }
    },

    {
        path: '/create-profile',
        name: 'CreateProfile',
        component: CreateProfile,
        meta: {
            title: 'Create a Profile',
        }

    },
    {
        path: '/myspace',
        name: 'MySpace',
        component: MySpace,
        meta: {
            title: 'MySpace',
            requiresAuth: true

        }

    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    document.title = `${to.meta.title} | Selin`
    if (to.name === 'MySpace' && !firebase.auth().currentUser) {
    next({ name: 'Login' });
  } else {
    next();
  }
})
export default router;