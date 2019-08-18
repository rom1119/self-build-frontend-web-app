<template>
    <div>
        <div class="row mt-5 institution-heading">
            <div class="col-2 text-center institution-heading__logo-col">
                <img width="55%" :src="institution.logo" alt="">
            </div>
            <div class="col-10 align-self-center institution-heading__name-col">
                <h3 class="heading">{{ institution.name }}</h3>
            </div>
        </div>
        <div class="row justify-content-between mt-5 institution-details">
            <div class="col-8">
                <h5 class="heading">Opis</h5>
                <p>{{ institution.description }}</p>
            </div>
            <div class="col-3">
                <h5 class="heading">Dane teleadresowe</h5>
                <address>
                    ul. {{ institution.address }}<br>
                    tel. {{ institution.phone }}<br>
                    email: <a :href="`mailto:${institution.email_address}`">{{ institution.email_address }}</a><br>
                    Strona internetowa:<br>
                     {{ institution.website }}<br>
                </address>
            </div>
        </div>

        <div class="row justify-content-center my-5">
            <div class="col-auto">
                <h2 class="heading heading--page">Szczegóły instytucji</h2>
            </div>
        </div>

<!--        <div class="content content&#45;&#45;bg content&#45;&#45;bg-normal-top pt-4">-->
<!--            <div class="row">-->
<!--                <div class="col-12">-->
<!--                    <table class="publications__table w-100" >-->
<!--                        <thead>-->
<!--                        <tr>-->
<!--                            <td>Nazwa</td>-->
<!--                            <td>Kategoria</td>-->
<!--                            <td>Data publikacji</td>-->
<!--                            <td>Lokalizacja</td>-->
<!--                        </tr>-->
<!--                        </thead>-->
<!--                        <tbody>-->

<!--                            <tr>-->
<!--                                <td>-->
<!--                                    <div class="publication-name">{{ institution.name }}</div>-->
<!--                                    &lt;!&ndash;                                    <div v-if="publication.institution" class="publication-institution">&ndash;&gt;-->
<!--                                    &lt;!&ndash;                                        <nuxt-link :to="`/institution/${publication.institution.id}`">{{&ndash;&gt;-->
<!--                                    &lt;!&ndash;                                            publication.institution.name }}&ndash;&gt;-->
<!--                                    &lt;!&ndash;                                        </nuxt-link>&ndash;&gt;-->
<!--                                    &lt;!&ndash;                                    </div>&ndash;&gt;-->
<!--                                    &lt;!&ndash;                                    <div v-else class="publication-institution">Brak instytucji</div>&ndash;&gt;-->
<!--&lt;!&ndash;                                    <div class="mt-3">&ndash;&gt;-->
<!--&lt;!&ndash;                                        <span&ndash;&gt;-->
<!--&lt;!&ndash;                                            class="badge badge-pill badge-light publication-tag"&ndash;&gt;-->
<!--&lt;!&ndash;                                            v-for="tag in publication.publication_tags"&ndash;&gt;-->
<!--&lt;!&ndash;                                            :key="tag.id"&ndash;&gt;-->
<!--&lt;!&ndash;                                        >{{ tag.name }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;                                    </div>&ndash;&gt;-->
<!--                                </td>-->
<!--&lt;!&ndash;                                <td v-if="publication.publication_categories">&ndash;&gt;-->
<!--&lt;!&ndash;                                    {{ publication.publication_categories[0].name }}&ndash;&gt;-->
<!--&lt;!&ndash;                                </td>&ndash;&gt;-->
<!--&lt;!&ndash;                                <td>{{ publication.created_at }}</td>&ndash;&gt;-->
<!--&lt;!&ndash;                                <td>Woj. Mazowieckie</td>&ndash;&gt;-->
<!--                            </tr>-->

<!--                            <tr class="spacer"></tr>-->
<!--                        </tbody>-->
<!--                    </table>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'


    @Component({

    })
    export default class PublicationsPage extends Vue {
        institution = new Object()
        async mounted() {
            // console.log(this.$store.state.institutions.items[this.$route.params.id])
            this.institution = await this.$store.dispatch('institutions/find', this.$route.params.id)
        }
    }
</script>

<style scoped>

</style>
