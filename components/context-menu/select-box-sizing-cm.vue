<template>
    <context-menu
        shift="both"
        ref="wrapped-context-menu">        
            <context-menu-item :key="el.name" v-for="el in boxSizingList" >
                <div @mousedown.stop="selectProp(el)" class="context-item" :class="{'active': el.getValue() ===  property}" >
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

@Component
export default class SelectBoxSizingContextMenu extends Vue {

    // @Prop({required: true, default: null})
    // value: HtmlTag

    @Prop({default:null, required:true})
    property

    htmlFactory: HtmlTagFactory = new HtmlTagFactory()

    api: ApiService
    boxSizingList: BoxSizing[] = []


    mounted() {
        // console.log(this.value.uuid);
        // this.nameCM = this.nameCM.concat(this.propertyUnit)
        // this.nameCM = this.nameCM.concat(this.value.uuid)

        this.api = new DefaultApiService();

        this.boxSizingList.push(BoxSizing.NEW_CONTENT_BOX())
        this.boxSizingList.push(BoxSizing.NEW_PADDING_BOX())
        this.boxSizingList.push(BoxSizing.NEW_BORDER_BOX())

        
    }

    get customProp()
    {
        return this.property
    }

    set customProp(val)
    {
        this.$emit('changeProp', val)
    }
    
    selectProp(arg: BoxSizing) {

        // console.log(target);
        // console.log(target);
        this.customProp = arg.getValue()
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
