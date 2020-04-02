<template>
    <context-menu
        shift="both"
        ref="wrapped-context-menu">
        <context-menu
        shift="both"
        :ref="colorUnitCM">

            <context-menu-item :key="color" v-for="color in colorsDefined">
                <div @mousedown.stop="selectColor(color)" class="context-item" :class="{'active': color ===  property.clearColor}" >
                    {{ color }}
                </div>
            </context-menu-item>
           
        </context-menu>
        
        <context-menu
            shift="both"
            :ref="widthUnitCM">

            <context-menu-item :key="unit.name" v-for="unit in sizeUnits">
                <div @mousedown.stop="selectSizeUnit(unit)" class="context-item" :class="{'active': unit.name ===  property.clearWidthUnit.name}" >
                    {{ unit.name }}
                </div>
            </context-menu-item>
  
        </context-menu>
        
        <context-menu
            shift="both"
            :ref="borderTypeCM">

                <context-menu-item :key="type" v-for="type in borderTypes">
                    <div @mousedown.stop="selectBorderStyle(type)" class="context-item" :class="{'active': type ===  property.clearStyle}" >
                    {{ type }}
                     </div>
                </context-menu-item>
         
  
        </context-menu>
        <!-- <create-html-element-context-menu :value="value"  :ref="createElementNameCM" /> -->
        
        <context-menu-item v-context-menu="colorUnitCM">Kolor</context-menu-item>
        <context-menu-item v-context-menu="borderTypeCM">Styl</context-menu-item>
        <context-menu-item v-context-menu="widthUnitCM">Jednostka szerokości</context-menu-item>
        

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
import UnitColor from '~/src/Unit/UnitColor';
import UnitSize from '~/src/Unit/UnitSize';
import { Pixel, Percent, EM, REM, VW, VH, Hexadecimal, RGBA, Named } from '~/src/Unit';
import BorderStyle from '~/src/Css/Border/Global/BorderGlobalStyle';
import BaseBorderCss from '../../src/Css/Border/BaseBorderCss';
import { BorderGlobalColor } from '~/src/Css';

@Component
export default class BorderContextMenu extends Vue {

    @Prop({required: true, default: null})
    property: BaseBorderCss

    htmlFactory: HtmlTagFactory = new HtmlTagFactory()

    widthUnitCM = 'width-border-unit-cm-'
    colorUnitCM = 'color-border-unit-cm-'
    borderTypeCM = 'border-type-cm-'

    api: ApiService

    colorsDefined: string[] = []
    sizeUnits: UnitSize[] = []
    borderTypes: string[] = []



    mounted() {
        // console.log(this.value.uuid);
        this.widthUnitCM = this.widthUnitCM
        this.colorUnitCM = this.colorUnitCM
        this.borderTypeCM = this.borderTypeCM
        this.api = new DefaultApiService();

        this.colorsDefined = BorderGlobalColor.getAccessableProperty()

        this.sizeUnits.push(new Pixel())
        this.sizeUnits.push(new Percent())
        this.sizeUnits.push(new EM())
        this.sizeUnits.push(new REM())
        this.sizeUnits.push(new VW())
        this.sizeUnits.push(new VH())

        // this.colorUnits.push(new Hexadecimal())
        // this.colorUnits.push(new Named())
        // this.colorUnits.push(new RGBA())

        this.borderTypes = BorderStyle.getAccessableProperty()
        
    }
    
    selectColor(val) {
        this.property.setThirdUnit(new Named())
        this.property.clearColor = val

        
        this.$emit('change', val)

    }
    
    selectSizeUnit(val) {
        this.property.clearWidthUnit = val
        this.$emit('change', val)


        // var el = this.htmlFactory.createH1()
        // el.parent = this.value
        // el.projectId = this.value.projectId
        // el.injectInitialCssStyles()
        // el.setProjectId(this.$route.params.id)
        // this.value.appendChild(el)

        // this.$emit('createdTag', el)

    }


    selectBorderStyle(val) {
        console.log(val);
        
        this.property.clearStyle = val
        this.$emit('change', val)

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
