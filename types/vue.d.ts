// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue'
// @ts-ignore
import AlertsContainer from '~/components/AlertsContainer'
// @ts-ignore
import LoadingDialog from '~/components/LoadingDialog'
// @ts-ignore
import ConfirmDialog from '../components/ConfirmDialog'
import TextManageModal from '~/components/modal/TextManageModal.vue'
import BackgroundManageModal from '~/components/modal/BackgroundManageModal.vue'
import BorderManageModal from '~/components/modal/BorderManageModal.vue'
import BoxModelManageModal from '~/components/modal/BoxModelManageModal.vue'
import DisplayManageModal from '~/components/modal/DisplayManageModal.vue'
import ShadowManageModal from '~/components/modal/ShadowManageModal.vue'
import AnimationManageModal from '~/components/modal/AnimationManageModal.vue'
import LayoutCreatorMode from '~/components/LayoutCreatorMode.vue'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import {Auth} from "~/types/nuxtjs-auth-module";

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface Vue {
        $alertsContainer: AlertsContainer,
        $loadingDialog: LoadingDialog,
        $confirmDialog: ConfirmDialog,
        $textManageModal: TextManageModal,
        $backgroundManageModal: BackgroundManageModal,
        $borderManageModal: BorderManageModal,
        $boxModelManageModal: BoxModelManageModal,
        $displayManageModal: DisplayManageModal,
        $shadowManageModal: ShadowManageModal,
        $animationManageModal: AnimationManageModal,
        $layoutCreatorMode: LayoutCreatorMode,
        $axios: NuxtAxiosInstance,
        $auth: Auth
    }
}
