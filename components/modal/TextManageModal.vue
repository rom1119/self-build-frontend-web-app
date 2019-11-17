<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <base-modal v-model="value">
        <template slot="header">
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
                    <li class="content-item__elem" v-for="align in textAligns" :key="align">
                        <label :for="'textAlign-' + align">
                            {{ align }}
                            <input type="radio" v-model="setTextAlign" :value="align" name="textAlign" :id="'textAlign-' + align">

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


    @Component
    export default class TextManageModal extends BaseModal {
        

        timeout
        loading
        key = 0

        textAligns: string[] = TextAlign.getAccessableProperty()

        idName = 'text-property-modal'

        get hashID(): string
        {
            return this.idName
        }

        async mounted()
        {
            
        }

        get setTextAlign()
        {
            let align = this.value.cssAccessor.getProperty(TextAlign.PROP_NAME)
            if (align) {
                return align.getValue()
            }
            return ''
        }
        
        set setTextAlign(newVal: string)
        {
            console.log(newVal);
            
            if (!this.value.cssAccessor.hasCssProperty(TextAlign.PROP_NAME)) {
                let textALign = new TextAlign(newVal)
                this.value.cssAccessor.addNewProperty(textALign)

            } else {
                this.value.updateCssProperty(TextAlign.PROP_NAME, newVal)
                
            }

        }

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }




    }
</script>

<style lang="scss">
    
</style>
