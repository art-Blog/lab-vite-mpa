import {createRouter, createWebHistory} from "vue-router";
import TeamsList from "@/pages/teams/components/teams/TeamsList.vue";
import UsersList from "@/pages/teams/components/users/UsersList.vue";
import TeamMembers from "@/pages/teams/components/teams/TeamMembers.vue";

const routes = [
    {
        name: 'teams',
        path: '/teams',
        component: TeamsList,
        children: [
            {
                name: 'team-members',
                path: ':teamId',
                component: TeamMembers,
                props: true,
            },
        ],
    },
    {path: '/teams/users', component: UsersList},
    {path: '/:notFound(.*)', redirect: '/teams'}, 
]

const router = createRouter({
    linkActiveClass: 'active',
    history: createWebHistory(),
    routes,
});

export default router