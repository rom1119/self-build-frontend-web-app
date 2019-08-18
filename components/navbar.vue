<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <nuxt-link to="/" class="navbar-brand">Główna</nuxt-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <nuxt-link tag="li" class="nav-item" to="/" active-class="active" exact>
                        <a class="nav-link">Wyszukiwarka</a>
                    </nuxt-link>
                </ul>
                <div class="navbar__contrast-toggler">
                    <img src="@/assets/img/contrast.svg" alt="">
                </div>
                <div class="navbar__user-dropdown">

                    <b-dropdown v-if="$auth.loggedIn">
                        <template v-slot:button-content>
                            <img class="navbar__user-avatar" src="@/assets/img/contrast.svg" alt="">
                            <span class="navbar__user-name">{{ $auth.user.name }}</span>
                        </template>
                        <b-dropdown-item @click="$router.push('/account-settings')">Ustawienia</b-dropdown-item>
                        <b-dropdown-item @click="logout">Wyloguj</b-dropdown-item>
                    </b-dropdown>

                    <button v-else class="btn btn-primary" @click="$router.push('/login')">Zaloguj</button>
                </div>
            </div>
        </div>

    </nav>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import base64 from  'base-64'

    @Component
    export default class Navbar extends Vue {

        get hasInstitution() {
            return !!this.$auth.user.institution
        }

        logout()
        {
            let clientId = process.env.API_CLIENT_ID
            let clientSecret = process.env.API_CLIENT_SECRET
            let encodedCredentialApi = base64.encode(clientId + ':' + clientSecret)
            this.$loadingDialog.show()
            // @ts-ignore
            this.$auth.logout({headers: {'Authorization': 'Basic ' + encodedCredentialApi}})
            this.$router.push('/')
            this.$loadingDialog.hide()
        }
    }
</script>

<style scoped>

</style>
