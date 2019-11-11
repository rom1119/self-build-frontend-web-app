<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <base-modal>
        <template slot="header">
            <h1>
                Zarządzaj tekstem
            </h1>
        </template>
        <template slot="content">
            <div>
                <h4>
                    Wyrównianie tekstu
                    <ul>
                        <li v-for="align in textAligns" :key="align">
                            <label :for="'textALign-' + align">
                                {{ align }}
                                <input type="radio" name="textALign" :id="'textALign-' + align">

                            </label>
                        </li>
                    </ul>
                </h4>
            </div>
        </template>
        <template slot="footer">
            <button >
                Zapisz
            </button>


            <button>
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


    @Component
    export default class TextManageModal extends Vue {
        @Prop({default: null, required: true})
        value: HtmlTag

        timeout
        loading

        textAligns: string[] = TextAlign.getAccessableProperty()

        idName = 'text-property-modal'

        get hashID(): string
        {
            return this.idName
        }

        async mounted()
        {
            
        }

        @Watch('pagination.page', {deep: false, immediate: false})
        async onPaginationChange(e)
        {
           
        }




    }
</script>

<style lang="scss">
    
</style>
