<template>
    <div id="app">
        <header>
            <!-- <navbar/> -->
        </header>
        
        <main class="in-row">
            <!-- <sidebar></sidebar> -->
            
            <nuxt/>

        </main>
        
        <loading-dialog></loading-dialog>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import Navbar from '@/components/navbar.vue'
    import FooterComponent from '@/components/footer.vue'
    import LoadingDialog from "~/components/LoadingDialog.vue";

    @Component({
        components: {
            Navbar,
            FooterComponent,
            LoadingDialog
        }
    })
    export default class CodeViewerLayout extends Vue {

    }
</script>
<style  lang="scss">
    .in-row {
        display: flex;
    }
</style>
