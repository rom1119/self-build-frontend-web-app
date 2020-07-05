<template>
    <div id="app" class="container-fluid">
        <header>
            <navbar/>
        </header>
        
        <main class="row">
            <sidebar class="col-2"></sidebar>
            
            <nuxt class="col-10"/>

        </main>
        
        <loading-dialog></loading-dialog>
    </div>

</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    import Navbar from '@/components/navbar.vue'
    import FooterComponent from '@/components/footer.vue'
    import LoadingDialog from "~/components/LoadingDialog.vue";
    import Sidebar from "~/components/sidebar.vue";
    import HtmlSocketApi from '~/src/Api/impl/HtmlSocketApi';

    @Component({
        components: {
            Sidebar,
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
