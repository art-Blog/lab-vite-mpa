import {createRouter, createWebHistory} from "vue-router";
import IntroAbout from "@/components/intro/IntroAbout.vue";
import IntroMonster from "@/components/intro/IntroMonster.vue";
import Archive from "@/pages/home/components/Archive.vue";

const routes = [
    {name: 'home-archive', path: '/home/archive', component: Archive},
    {name: 'home-intro-monster', path: '/home/introMonster', component: IntroMonster},
    {name: 'home-intro-about', path: '/home/introAbout', component: IntroAbout},
    // {path: '/:notFound(.*)', redirect: '/teams'},
]

const router = createRouter({
    linkActiveClass: 'active',
    history: createWebHistory(),
    routes,
});

export default router