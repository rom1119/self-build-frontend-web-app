<template>
    <div id="app" class="container-fluid">
        <header>
            <navbar/>
        </header>
        
        <main class="rel">
            <!-- <sidebar ></sidebar> -->

            <div id="animationToolSidebar"></div>
            <!-- <div id="layoutTagToolSidebar"></div> -->
            <nuxt />

        </main>
        
        <loading-dialog></loading-dialog>
    </div>

</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    import Navbar from '@/components/navbar.vue'
    import FooterComponent from '@/components/footer.vue'
    import LoadingDialog from "~/components/LoadingDialog.vue";
    import HtmlSocketApi from '~/src/Api/impl/HtmlSocketApi';

    @Component({
        components: {
            Navbar,
            FooterComponent,
            LoadingDialog
        }
    })
    export default class DashboardLayout extends Vue {

        
    }
</script>
<style  lang="scss">
    .in-row {
        display: flex;
    }
</style>
