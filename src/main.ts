import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/components/MainPage/MainPage.vue";
import SheetOfNotesPage from "@/components/SheetOfNotesPage/SheetOfNotesPage.vue";

// Use interceptors everywhere
import "./interceptors"

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
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
