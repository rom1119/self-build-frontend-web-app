<template>
    <context-menu
        shift="both"
        ref="wrapped-context-menu">        
            <context-menu-item :key="unit.key" v-for="unit in types" >
                <div @mousedown.stop="selectUnit(unit)" class="context-item" :class="{'active': unit.NAME ===  propertyUnit.NAME}" >
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
import { Pixel, Percent, EM, REM, VH, Named } from '~/src/Unit';
import VW from '../../src/Unit/Size/VW';
import HtmlNode from '../../src/Layout/HtmlNode';
import Unit from '../../src/Unit/Unit';
import UnitDeg from '~/src/Unit/UnitDeg';
import UnitTurn from '~/src/Unit/UnitTurn';
import ColspanAttr from '~/src/Attribute/html/ColspanAttr';
import RowspanAttr from '~/src/Attribute/html/RowspanAttr';
import CustomAttr from '~/src/Attribute/html/CustomAttr';

@Component
export default class HtmlAttrTypeContextMenu extends Vue {

    // @Prop({required: true, default: null})
    // value: HtmlTag

    @Prop({default:null, required:true})
    propertyUnit

    htmlFactory: HtmlTagFactory = new HtmlTagFactory()

    api: ApiService
    types: string[] = []


    mounted() {
        // console.log(this.value.uuid);
        // this.nameCM = this.nameCM.concat(this.propertyUnit)
        // this.nameCM = this.nameCM.concat(this.value.uuid)

        this.api = new DefaultApiService();

        this.types.push(ColspanAttr.NAME)
        this.types.push(RowspanAttr.NAME)
        this.types.push(CustomAttr.NAME)
        
        
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
