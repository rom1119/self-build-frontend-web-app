// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue'
// @ts-ignore
import AlertsContainer from '~/components/AlertsContainer'
// @ts-ignore
import LoadingDialog from '~/components/LoadingDialog'
// @ts-ignore
import ConfirmDialog from '../components/ConfirmDialog'
import TextManageModal from '~/components/modal/TextManageModal.vue'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {Auth} from "~/types/nuxtjs-auth-module";

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface Vue {
        $alertsContainer: AlertsContainer,
        $loadingDialog: LoadingDialog,
        $confirmDialog: ConfirmDialog
        $textManageModal: TextManageModal
        $axios: NuxtAxiosInstance,
        $auth: Auth
    }
}
