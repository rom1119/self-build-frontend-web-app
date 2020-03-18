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
    import Sidebar from "~/components/sidebar.vue";
import SocketApi from '~/src/Api/SocketApi';
import DefaultSocketApi from '~/src/Api/impl/DefaultSocketApi';

    @Component({
        components: {
            Sidebar,
            Navbar,
            FooterComponent,
            LoadingDialog
        }
    })
    export default class CodeViewerLayout extends Vue {
        public static SOCKET_MSG_NAME = '/topic/greetings'
        protected apiSocket: SocketApi

        mounted() {
            this.apiSocket = new DefaultSocketApi()
            this.apiSocket.connect()
            this.apiSocket.onGetMessage()

        }
    }
</script>
<style  lang="scss">
    .in-row {
        display: flex;
    }
</style>
