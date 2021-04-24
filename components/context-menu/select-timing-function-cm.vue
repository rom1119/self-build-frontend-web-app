<template>
    <context-menu
        shift="both"
        ref="wrapped-context-menu">        
            <context-menu-item :key="el.name" v-for="el in timingFunctions" >
                <div @mousedown.stop="selectProp(el)" class="context-item" :class="{'active': el.getValue() ===  property.getValue()}" >
                {{ el.getValue() }}
                </div>

            </context-menu-item>

        

    </context-menu>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import HtmlTagFactory from '~/src/Layout/HtmlTagFactory';
import HtmlTag from '../../src/Layout/HtmlTag';
import ApiService from '~/src/Api/ApiService';
import DefaultApiService from '~/src/Api/impl/DefaultApiService';
import TextNode from '~/src/Layout/TextNode';
import LayoutEl from '../../src/LayoutEl';
import UnitSize from '~/src/Unit/UnitSize';
import { Pixel, Percent, EM, REM, VH } from '~/src/Unit';
import VW from '../../src/Unit/Size/VW';
import HtmlNode from '../../src/Layout/HtmlNode';
import Unit from '../../src/Unit/Unit';
import { BoxSizing } from '../../src/Css';
import { Linear, Ease, EaseIn, EaseOut, EaseInOut, CubicBezier } from '~/src/Animation/timingFunction';
import TimingFunction from '~/src/Animation/timingFunction/TimingFunction';

@Component
export default class SelectTimingFunctionContextMenu extends Vue {

    // @Prop({required: true, default: null})
    // value: HtmlTag

    @Prop({default:null, required:true})
    property: TimingFunction

    htmlFactory: HtmlTagFactory = new HtmlTagFactory()

    api: ApiService
    timingFunctions: TimingFunction[] = []


    mounted() {
        // console.log(this.value.uuid);
        // this.nameCM = this.nameCM.concat(this.propertyUnit)
        // this.nameCM = this.nameCM.concat(this.value.uuid)

        this.api = new DefaultApiService();

        this.timingFunctions.push(new Linear())
        this.timingFunctions.push(new Ease())
        this.timingFunctions.push(new EaseIn())
        this.timingFunctions.push(new EaseOut())
        this.timingFunctions.push(new EaseInOut())
        this.timingFunctions.push(new CubicBezier())

        
    }

    get customProp()
    {
        return this.property
    }

    set customProp(val)
    {
        this.$emit('changeProp', val)
    }
    
    selectProp(arg: TimingFunction) {

        // console.log(target);
        // console.log(target);
        this.customProp = arg
        // console.log(cm);
        // console.log(a);
        

    }


    
}
</script>

<style  scoped>
   .active {
       background-color: brown;
   }

   .context-menu-item {
       padding: 0;

   }
   .context-item {
       padding: 5px 10px;
        font-size: 16px !important;
   }
</style>
