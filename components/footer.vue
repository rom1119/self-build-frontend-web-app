<template>
    <footer class="footer">
        <div class="footer__top">
            <div class="container">
                <div class="row justify-content-between">
                    <div class="col-5">
                        <h3>About us</h3>
                        <p>Malesuada a nulla a venenatis parturient a malesuada nunc auctor metus consectetur velit dolor eget diam mi condimentum ac ut a tellus vitae.</p>
                        <a href="">Dołącz do nas</a>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="col-6">
                                <h3>Project generator</h3>
                                <ul class="nav flex-column">
                                    <nuxt-link tag="li" class="nav-item" to="/dashboard/layouts" active-class="active" exact>
                                        <a class="nav-link">Layouts</a>
                                    </nuxt-link>

                                </ul>
                            </div>
                            <div class="col-6">
                                <h3>Another one</h3>
                                <ul class="nav flex-column">
                                    <!-- <li class="nav-item"  v-for="cat in faqCategories">
                                        <a class="nav-link active" @click.prevent="$router.push('/faqs-by-category/' + cat.id)">{{ cat.name }}</a>
                                    </li> -->

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="footer__bottom">
            <div class="container">
                <div class="row justify-content-between">
                    <div class="col-auto">Logo 1</div>
                    <div class="col-auto">Logo2</div>
                </div>

                <hr class="hr">

                <div class="row justify-content-between">
                    <div class="col-auto">
                        <p>Copyrights 2021 by ARNOLD. All rights reserved.</p>
                    </div>
                    <div class="col-auto">
                        <p>Realization</p>
                    </div>
                </div>
            </div>


        </div>
    </footer>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'

    @Component
    export default class Footer extends Vue {
        faqCategories = []

        async mounted()
        {
            this.$loadingDialog.show()
            // this.faqCategories = await this.$axios.$post('/oauth/token')
            this.$loadingDialog.hide()
        }
    }
</script>

<style scoped>

</style>
