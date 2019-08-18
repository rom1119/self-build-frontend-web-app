<template>
    <div>
        <header>
            <navbar/>
        </header>
        <main class="container-fluid">
            <nuxt/>
        </main>
        <footer-component />
        <loading-dialog></loading-dialog>
    </div>


</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import Navbar from '@/components/navbar.vue'
    import FooterComponent from '@/components/footer.vue'
    import LoadingDialog from '@/components/LoadingDialog.vue'

    @Component({
        components: {
            Navbar,
            LoadingDialog
        }
    })
    export default class DefaultLayout extends Vue {

    }
</script>
