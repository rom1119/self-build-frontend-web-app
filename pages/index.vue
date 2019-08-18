<template>
    <div class="content content--notch-bottom">
        <div class="row justify-content-center pb-4">
            <div class="col-auto">
                <h2 class="heading heading--page">Home</h2>
            </div>
        </div>


    </div>



</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'

    @Component({
        // async asyncData({$axios}) {
        //     return {
        //
        //     }
        // }
    })
    export default class IndexPage extends Vue {
        provinces = []
        communities = []
        years = []

        currentProvince = null
        currentCommune = null
        currentYear = null


        @Watch('currentProvince')
        async onCurrentProvince() {
            this.$loadingDialog.show()
            try {
                // this.communities = (await this.$axios.$get(`/units/province/${this.currentProvince.id}/communes/all`))
            } catch (e) {
                alert('Błąd pobierania')
            }
            this.$loadingDialog.hide()
        }

        async mounted()
        {
            this.$loadingDialog.show()
            // let provinces = await this.$axios.$get('/units/provinces')
            // this.provinces = provinces
            this.$loadingDialog.hide()
        }

        goToReport() {
            this.$router.push(`/report-new?commune=${this.currentCommune.id}&year=${this.currentYear.name}`)
        }
    }

</script>

<style lang="scss" scoped>

</style>
