<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <base-modal v-show="active">
    
        <template slot="header">
            <div class="close">
                <button @click="close">X</button>
            </div>
            <h4>
                Zarządzaj tekstem
            </h4>
        </template>
        <template slot="content">
            <div class="content-item">
                <h4 class="content-item__header">
                    Wyrównianie tekstu
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in textAligns" :key="el">
                        <label :for="'textAlign-' + el">
                            {{ el }}
                            <input type="radio" v-model="textAlign" :value="el" name="textAlign" :id="'textAlign-' + el">

                        </label>
                    </li>
                </ul>
            </div>
            <div class="content-item">
                <h4 class="content-item__header">
                    Pogrubienie tekstu
                </h4>
                <ul class=" content-item__elem_container">
                    <li class="content-item__elem" v-for="el in fontWeights" :key="el">
                        <label :for="'fontWeight-' + el">
                            {{ el }}
                            <input type="radio" v-model="fontWeight" :value="el" name="fontWeight" :id="'fontWeight-' + el">

                        </label>
                    </li>
                </ul>
            </div>
        </template>
        <template slot="footer">
            

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
    import BaseModal from '../BaseModal.vue';
    import FontWeight from '../../src/Css/Text/FontWeight';
    import BasePropertyCss from '../../src/Css/BasePropertyCss';


    @Component
    export default class TextManageModal extends Vue {
        active = false
        timeout
        value: HtmlTag

        
        textAligns: string[] = TextAlign.getAccessableProperty()
        fontWeights: string[] = FontWeight.getAccessableProperty()

        idName = 'text-property-modal'

        public show(val: HtmlTag)
        {
            this.active = true
            this.value = val
            
        }

        public close()
        {
            this.active = false
            this.value = null
        }


        get hashID(): string
        {
            return this.idName
        }

        async mounted()
        {
            
        }

        get textAlign()
        {
            return this.getPropertyFromModel(TextAlign.PROP_NAME)
        }
        
        set textAlign(newVal: string)
        {
            this.setPropertyToModel(new TextAlign(newVal)) 
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
