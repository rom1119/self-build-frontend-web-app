<template >
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <nuxt-link to="/" class="navbar-brand white-font">HOME
            </nuxt-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto" >
                    <li id="layoutCreatorInfo">
                    </li>
                    <li id="layoutCreatorMode">
                    </li>
                
                    <nuxt-link tag="li" class="nav-item" v-show="$auth.loggedIn" to="/dashboard" active-class="active" exact>
                        <a class="nav-link">Dashboard</a>
                    </nuxt-link>


                    <nuxt-link tag="li" class="nav-item" v-show="$auth.loggedIn" to="/home" active-class="active" exact>
                        <a class="nav-link">Home</a>
                    </nuxt-link>
                </ul>
                
                <div class="navbar__user-dropdown">

                    <nuxt-link tag="div" class=" btn" to="/dashboard/layouts" active-class="" exact>
                        <a>Projects</a>
                    </nuxt-link>
                    <li class="btn btn-primary" @click="generattingCode" v-if="$route.name == 'dashboard-layout-creator-id'"  active-class="active">
                        <a class="">Code Generator</a>
                    </li>
                    <li class="btn btn-primary" :class="{'active': fontFaceActive}" @click="toggleFontFace" v-if="$route.name == 'dashboard-layout-creator-id'"  active-class="active">
                        <a class="">Font Face</a>
                    </li>
                    <b-dropdown v-if="$auth.loggedIn">
                        <template v-slot:button-content>
                            <img class="navbar__user-avatar" src="@/assets/img/contrast.svg" alt="">
                            <span class="navbar__user-name">{{ $auth.user.name }}</span>
                        </template>
                        <b-dropdown-item @click="$router.push('/account-settings')">Settings</b-dropdown-item>
                        <b-dropdown-item @click="logout">Log out</b-dropdown-item>
                    </b-dropdown>

                    <button v-else class="btn" @click="$router.push('/login')">Sign in</button>
                </div>
            </div>
        </div>

    </nav>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    import base64 from  'base-64'
    import HtmlSocketApi from '~/src/Api/impl/HtmlSocketApi'

    @Component
    export default class Navbar extends Vue {
        
        sessionID = {value: null}
        created()
        {
            // Vue.set(HtmlSocketApi, 'CURRENT_SESSION_ID', {value: null})
            this.sessionID = HtmlSocketApi.CURRENT_SESSION_ID
            console.log(HtmlSocketApi.CURRENT_SESSION_ID);
            console.log(this.sessionID);
        }

        @Watch('sessionID', {deep: true})
        sessionIdWatch(a)
        {
            // console.log('@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&@@');
            // console.log(a);
            // return this.$store.getters['globals/sessionId']
        }

        fontFaceActive = false
        
        @Watch('$fontFaceManageModal.active', {deep: true})
        onActange(aa) {
            this.fontFaceActive = aa
        }

        toggleFontFace() {
            if (this.$fontFaceManageModal.active) {
                this.$fontFaceManageModal.close()
            } else {
                this.$fontFaceManageModal.show()

            }
        }

        generattingCode()
        {
            // console.log('generattingCode')
            // console.log()
            var wind = window.open('/code-viewer/html-project/'  + this.sessionID.value + '?projectId=' + this.$route.params.id)
        }

        logout()
        {
            let clientId = process.env.API_CLIENT_ID
            let clientSecret = process.env.API_CLIENT_SECRET
            let encodedCredentialApi = base64.encode(clientId + ':' + clientSecret)
            this.$loadingDialog.show()
            // @ts-ignore
            this.$auth.logout({headers: {'Authorization': 'Basic ' + encodedCredentialApi}})
            this.$router.push('/login')
            this.$loadingDialog.hide()
        }
    }
</script>

<style scoped>

</style>
