<template>

    <div class="row justify-content-center content content--notch-bottom">
        <form class="col-4 form-login">
            <div class="alert alert-danger" role="alert" v-if="errorMessage">
                {{ errorMessage }}
            </div>

            <div class="form-row">
                <div class="form-group col-12">
                    <label for="inputEmail4">Login</label>
                    <input type="text" class="form-control" id="inputEmail4" placeholder="Login" v-model="username">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-12">
                    <label for="inputEmail4">Hasło</label>
                    <input type="password" class="form-control" placeholder="Hasło" v-model="password">
                </div>
            </div>

            <div class="form-row mt-4">
                <div class="form-group col-12">
                    <button class="btn btn-primary w-100" @click.prevent="login">Zaloguj</button>
                </div>
            </div>

            <div class="form-row mt-4">
                <div class="form-group col-6">
                    <a href="/register">Zarejestruj się</a>
                </div>
                <div class="form-group col-6 text-right">
                    <a href="/password-reset">Przypomnij hasło</a>
                </div>
            </div>
        </form>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'

    @Component
    export default class LoginPage extends Vue {
        institution: boolean = false

        username = 'sadm'
        password = 'test'

        errorMessage = ''

        async login() {
            this.$loadingDialog.show()
            try {
                const data = new FormData();
                data.append('username', this.username)
                data.append('password', this.password)
                data.append('grant_type', process.env.API_CLIENT_GRANT_TYPE)

                 let a = await this.$auth.loginWith('local', {data})
                // console.log(this.$auth)
                // this.$auth.loggedIn = true
            } catch (e) {
                console.log(e)
                if (e.response.data.access_token) {
                    this.$store.dispatch('token/create', e.response.data)
                    console.log('success')
                    console.log(this.$store.getters['token/getOne'])
                    this.$router.push('/')
                }
                // if (e.response.data.error_description) {
                //     this.errorMessage = e.response.data.error_description
                // } else {
                //     this.errorMessage = 'Nieznany błąd'
                // }
            }
            this.$loadingDialog.hide()

        }
    }
</script>

<style scoped>

</style>
