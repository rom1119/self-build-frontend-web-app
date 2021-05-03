// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue'
// @ts-ignore
import AlertsContainer from '~/components/AlertsContainer'
// @ts-ignore
import LoadingDialog from '~/components/LoadingDialog'
// @ts-ignore
import ConfirmDialog from '../components/ConfirmDialog'
import TextManageModal from '~/components/modal/TextManageModal.vue'
import FontFaceManageModal from '~/components/modal/FontFaceManageModal.vue'
import ImgManageModal from '~/components/modal/ImgManageModal.vue'
import SvgManageModal from '~/components/modal/SvgManageModal.vue'
import BackgroundManageModal from '~/components/modal/BackgroundManageModal.vue'
import BorderManageModal from '~/components/modal/BorderManageModal.vue'
import BoxModelManageModal from '~/components/modal/BoxModelManageModal.vue'
import DisplayManageModal from '~/components/modal/DisplayManageModal.vue'
import ShadowManageModal from '~/components/modal/ShadowManageModal.vue'
import HtmlAttrManageModal from '~/components/modal/HtmlAttrManageModal.vue'
import GradientManageModal from '~/components/modal/GradientManageModal.vue'
import AnimationManageModal from '~/components/modal/AnimationManageModal.vue'
import LayoutCreatorModeComponent from '~/components/LayoutCreatorModeComponent.vue'
import LayoutCreatorInfoComponent from '~/components/LayoutCreatorInfoComponent.vue'
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
        $fontFaceManageModal: FontFaceManageModal,

        $imgManageModal: ImgManageModal,
        $svgManageModal: SvgManageModal,
        $backgroundManageModal: BackgroundManageModal,
        $borderManageModal: BorderManageModal,
        $boxModelManageModal: BoxModelManageModal,
        $displayManageModal: DisplayManageModal,
        $shadowManageModal: ShadowManageModal,
        $htmlAttrManageModal: HtmlAttrManageModal,
        $gradientManageModal: GradientManageModal,
        $animationManageModal: AnimationManageModal,
        $layoutCreatorMode: LayoutCreatorModeComponent,
        $layoutCreatorInfo: LayoutCreatorInfoComponent,
        $axios: NuxtAxiosInstance,
        $auth: Auth
    }
}
