 import { createApp } from 'vue'
 import App from './App.vue'
 import { library } from '@fortawesome/fontawesome-svg-core'
 import {
     faStarOfLife, faHeart, faClock, faUserCircle, faYenSign,
     faCoffee, faEnvelope, faLock, faUser, faUserPlus, faCloud,
     faSearch, faThumbtack, faBuilding, faTimes, faAngleDown, faAngleUp, faChevronLeft,
     faFileAlt, faHourglassHalf, faHourglassEnd, faMoon, faSun
 } from '@fortawesome/free-solid-svg-icons'
 import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 import { faInstagram,faGithub, faTelegram, faFacebook, faWhatsapp, faWeixin, faLinkedin } from '@fortawesome/free-brands-svg-icons'

 import router from './router'
 import store from './store'
 import firebase from "firebase/compat/app";
 import "firebase/compat/auth";

 import Vuex from 'vuex'
 import vSelect from 'vue-select'
 import Paginate from 'v-pagination-3'

 library.add({faInstagram,faTelegram, faFacebook, faWhatsapp, faWeixin, faLinkedin, faGithub,
     faCoffee, faHeart, faEnvelope, faLock, faUser, faUserPlus, faUserCircle, faMoon, faSun, 
     faClock, faStarOfLife, faYenSign, faSearch, faThumbtack, faBuilding, faCloud,
     faTimes, faFileAlt, faHourglassHalf, faHourglassEnd, faAngleDown, faAngleUp, faChevronLeft
 })

 // import Darkmode from 'darkmode-js';


 // import  BootstrapVue from 'bootstrap-vue'
//  import 'bootstrap/dist/css/bootstrap.css'
//  import 'bootstrap-vue/dist/bootstrap-vue.css'
 import './assets/tailwind.css'

 let app;
 firebase.auth().onAuthStateChanged((user) => {
     console.log(user);
     if (!app) {
       app = createApp(App).use(router).use(store).use(Vuex).use(vSelect)
         .component('fa', FontAwesomeIcon)
         .component('v-select', vSelect)
         .component('Paginate', Paginate)
             .mount('#app')
     }
 })
 // const options = {
 //   bottom: '24px', // default: '32px'
 //   right: 'unset', // default: '32px'
 //   left: '28px', // default: 'unset'
 //   time: '0.5s', // default: '0.3s'
 //   mixColor: '#fff', // default: '#fff'
 //   backgroundColor: '#fff',  // default: '#fff'
 //   buttonColorDark: '#100f2c',  // default: '#100f2c'
 //   buttonColorLight: '#00118f', // default: '#fff'
 //   saveInCookies: true, // default: true,
 //   label: '🌸', // default: ''
 //     autoMatchOsTheme: true, // default: true
 //   position: 'fixed', // default: 'absolute'
 // }

 // const darkmode = new Darkmode(options);
 // darkmode.showWidget();
