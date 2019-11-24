<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <base-modal v-show="active">
    
        <template slot="header">
            <div class="close">
                <button @click="close($event)">X</button>
            </div>
            <h4>
                Tło elementu
            </h4>
        </template>
        <template slot="content">
            <div class="content-item">
                <h4 class="content-item__header">
                    Kolor tła
                </h4>
                <div class=" content-item__elem_container">
                    <h2>
                        {{ backgroundColor }}
                    </h2>
        <Chrome v-model="backgroundColor" :color="backgroundColor" label="Color" />

                    
                </div>
            </div>

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
    import {Pagination} from "~/types/Pagination";
    import HtmlTag from '../../src/Layout/HtmlTag';
    import TextAlign from '../../src/Css/Text/TextAlign';
    import BaseModal from '~/components/BaseModal.vue';
    import FontWeight from '../../src/Css/Text/FontWeight';
    import BasePropertyCss from '../../src/Css/BasePropertyCss';
    import CssPropertyAccessor from '../../src/Css/CssPropertyAccessor';
    import AbstractModal from '../AbstractModal';
import { Chrome }  from '~/node_modules/vue-color';
import BackgroundColor from '~/src/Css/Background/BackgroundColor';

// let Chrome = ColourPicker.Chrome


interface colorObject {
    r, g, b, a
}

interface Color {
    rgba: colorObject
}

    @Component(
        {
            components: {
                Chrome
            }
        }
    )
    export default class BackgroundManageModal extends AbstractModal {
        
        timeout
        // value: HtmlTag
        colour = '#fff'
        textAligns: string[] = TextAlign.getAccessableProperty()
        fontWeights: string[] = FontWeight.getAccessableProperty()

        idName = 'text-property-modal'

        get hashID(): string
        {
            return this.idName
        }

        async mounted()
        {
            
        }

        get backgroundColor()
        {
            return this.getPropertyFromModel(BackgroundColor.PROP_NAME)
        }
        
        set backgroundColor(newVal)
        {   
            var col: Color = <any>newVal
            let red = col.rgba.r
            let green = col.rgba.g
            let blue = col.rgba.b
            let alpha = col.rgba.a
            var stringRgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`
            this.setPropertyToModel(new BackgroundColor(stringRgbaColor)) 
        }
        
        get fontWeight()
        {
            return this.getPropertyFromModel(FontWeight.PROP_NAME)
        }
        
        set fontWeight(newVal: string)
        {
            console.log(newVal);
            this.setPropertyToModel(new FontWeight(newVal)) 
        }

        private getPropertyFromModel(prop: string)
        {
            if (!this.value) {
                return ''
            }
            let align = this.value.cssAccessor.getProperty(prop)
            if (align) {
                return align.getValue()
            }
            return ''
        }

        private setPropertyToModel(newCssProp: BasePropertyCss)
        {
            if (!this.value) {
                return ''
            }
            if (!this.value.cssAccessor.hasCssProperty(newCssProp.getName())) {
                let textALign = newCssProp
                this.value.cssAccessor.addNewProperty(textALign)

            } else {
                this.value.updateCssProperty(newCssProp.getName(), newCssProp.getValue())
                
            }
        }

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }




    }
</script>

<style lang="scss" scoped> 
    
</style>
