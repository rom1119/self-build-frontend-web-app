<template>
    <v-toolbar
        dark
        color="black"
    >
        <v-toolbar-title v-text="title">State selection</v-toolbar-title>
        <v-autocomplete
            v-model="selectedItem"
            :loading="loading"
            :items="elementsLoaded"
            :search-input.sync="searchStr"
            class="mx-3"
            :return-object="true"
            hide-details
            :hide-no-data="true"
            :label="inputPlaceholder"
            @change="onChangeInput"
            :filter="() => true"

        >

            <template slot="selection" slot-scope="prop">
                {{ prop.item.name }}
            </template>

            <template slot="item" slot-scope="prop">
                {{ prop.item.name }}
            </template>
        </v-autocomplete>

    </v-toolbar>
</template>
<script lang="ts">
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator'


    @Component
    export default class VuetifySelect2 extends Vue {

        searchStr = ""
        selectedItem =  {}
        elementsLoaded = []

        @Prop({default: null})
        title: String

        @Prop({default: null})
        inputPlaceholder: String

        @Prop({default: null})
        loading: boolean

        @Prop({default: null})
        val: Object

        @Prop({default: null})
        items: any[]

        @Prop({default: null})
        states: any[]

        @Prop({default: null})
        onChangeInput: Function

        get itemsComputed()
        {
            return this.elementsLoaded

        }

        set itemsComputed(v)
        {
            this.elementsLoaded = v

        }

        @Watch('searchStr', {deep: false, immediate: true})
        async onChangesearchStr(val)
        {
            this.onChangeInput(val);

        }

        @Watch('items', {deep: true, immediate: false})
        async onChangeItems(val)
        {
            if (val.length) {
                this.elementsLoaded = val

            }
        }

        querySelections (v) {
            this.loading = true
            // Simulated ajax query
            setTimeout(() => {
                this.items = this.states.filter(e => {
                    return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
                })
                this.loading = false
            }, 500)
        }
    }
</script>
