<template>
    <context-menu
        shift="both"
        ref="wrapped-context-menu">        
            <context-menu-item :key="unit.name" v-for="unit in allUnits" >
                <div @mousedown.stop="selectUnit(unit)" class="context-item" :class="{'active': unit.name ===  propertyUnit.name}" >
                {{ unit.label }}
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
import { Pixel, Percent, EM, REM, VH, UnitSecond, UnitMiliSecond } from '~/src/Unit';
import VW from '../../src/Unit/Size/VW';
import HtmlNode from '../../src/Layout/HtmlNode';
import Unit from '../../src/Unit/Unit';
import UnitTime from '~/src/Unit/UnitTime';

@Component
export default class SelectTimeUnitContextMenu extends Vue {

    // @Prop({required: true, default: null})
    // value: HtmlTag

    @Prop({default:null, required:true})
    propertyUnit

    htmlFactory: HtmlTagFactory = new HtmlTagFactory()

    api: ApiService
    allUnits: UnitTime[] = []


    mounted() {
        // console.log(this.value.uuid);
        // this.nameCM = this.nameCM.concat(this.propertyUnit)
        // this.nameCM = this.nameCM.concat(this.value.uuid)

        this.api = new DefaultApiService();

        this.allUnits.push(new UnitSecond())
        this.allUnits.push(new UnitMiliSecond())

        
    }

    get customUnit()
    {
        return this.propertyUnit
    }

    set customUnit(val)
    {
        this.$emit('changePropUnit', val)
    }
    
    selectUnit(unit: Unit) {

        // console.log(target);
        // console.log(target);
        this.customUnit = unit
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
