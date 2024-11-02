import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/components/MainPage/MainPage.vue";
import SheetOfNotesPage from "@/components/SheetOfNotesPage/ShhetOfNotesPage.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: MainPage,
        },
        {
            path: "/notes",
            name: "SheetOfNotesPage",
            component: SheetOfNotesPage
        },
    ]});
createApp(App).use(router).mount('#app')
