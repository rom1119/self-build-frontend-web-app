<template >

    <base-modal v-show="active">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Gradient tła 
            </h4>
        </template>
        <template slot="content">
            
            <!-- <select-unit-context-menu :propertyUnit="val.offsetXUnit" @changePropUnit="val.offsetXUnit = $event" :ref="cmNameTextShadowOffX" /> -->

        </template>
        <template slot="footer">
            <button class="to-left" @click="restore($event)">
                Przywróć
            </button>
            <button class="to-right">
                Zapisz
            </button>
        </template>
    </base-modal>

</template>

<script lang="ts">
    import {Component, Watch, Vue, Prop} from 'vue-property-decorator'
    import 'vue-cal/dist/vuecal.css'
    import moment from 'moment'
    import _ from 'lodash'
    import {Pagination} from "~/types/Pagination";
    import HtmlTag from '../../src/Layout/HtmlTag';
    import TextAlign from '../../src/Css/Text/TextAlign';
    import BaseModal from '~/components/BaseModal.vue';
    import FontWeight from '../../src/Css/Text/FontWeight';
    import BasePropertyCss from '../../src/Css/BasePropertyCss';
    import CssPropertyAccessor from '../../src/Css/CssPropertyAccessor';
    import AbstractModal from '../AbstractModal';
    import Named from '../../src/Unit/Named';
    import UnitSize from '../../src/Unit/UnitSize';
    import Pixel from '../../src/Unit/Size/Pixel';
    import Percent from '../../src/Unit/Size/Percent';
    import EM from '../../src/Unit/Size/EM';
    import REM from '../../src/Unit/Size/REM';
    import PaddingRightCss from '../../src/Css/BoxModel/Padding/PaddingRightCss';
    import PaddingCss from '~/src/Css/BoxModel/Padding/PaddingCss';
import { Width, Display, JustifyContent, AlignItems, FlexDirection, FlexWrap, Float, Clear, BackgroundImage } from '~/src/Css';
import DisplayManageModal from '../DisplayManageModal';
import ShadowManageModal from '../ShadowManageModal';
import TextShadowCss from '../../src/Css/Shadow/TextShadowCss';
import TextShadowProperty from '../computedPropertyManagers/impl/ComputedProperty/Shadow/TextShadowProperty';
import GradientManageModal from '../GradientManageModal';
import LinearGradientCss from '../../src/Css/Gradient/impl/LinearGradientCss';
import RadialGradientCss from '~/src/Css/Gradient/impl/RadialGradientCss';
import LinearGradientProperty from '../computedPropertyManagers/impl/ComputedProperty/Gradient/LinearGradientProperty';
import RadialGradientProperty from '../computedPropertyManagers/impl/ComputedProperty/Gradient/RadialGradientProperty';
import RepeatingLinearGradientCss from '~/src/Css/Gradient/impl/RepeatingLinearGradientCss';
import RepeatingRadialGradientCss from '~/src/Css/Gradient/impl/RepeatingRadialGradientCss';

    @Component
    export default class GradientModalComponent extends AbstractModal {
      
        $refs: {
            manageComponent: TextManageComponent

        }

        mounted() {
            // this.$refs.manageComponent = null
        }
        onChangePseudoSelector()
        {
            this.$refs.manageComponent.onChangePseudoSelector()
        }

        show(currentActiveTag: HtmlTag){
            super.show(currentActiveTag)
            this.$refs.manageComponent.init(currentActiveTag)
        }

    }
</script>

<style lang="scss" scoped> 
    .active {
        background-color: rgba($color: #d81121, $alpha: .4);
    }
    .green-bg {
        background-color: greenyellow;

    }
    .rel {
        position: relative;
    }

    .h-550 {
        height: 550px;
    }
    .w-400 {
        width: 400px;
    }
    
    .w-50-pr {
        width: 50%;
    }
    
    .h-400 {
        height: 400px;
    }
</style>
