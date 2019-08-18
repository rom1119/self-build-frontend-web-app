<template>

    <div class="row justify-content-center content content--notch-bottom">
        <form class="col-4 form-login">
            <div class="alert alert-danger" role="alert" v-if="errorMessage">
                {{ errorMessage }}
            </div>

            <div class="form-row">
                <div class="form-group col-12">
                    <label>email</label>
                    <input type="email" class="form-control" placeholder="Adres email" v-model="email">
                </div>
            </div>

            <div class="form-row justify-content-center mt-4">
                <div class="form-group col-10">
                    <button class="btn btn-primary w-100" @click.prevent="resetPassword">Zresetuj hasło</button>
                </div>
            </div>

            <div class="form-row mt-4">
                <div class="form-group col-6">
                    <a href="/register">Zarejestruj się</a>
                </div>
                <div class="form-group col-6 text-right">
                    <a href="/login">Zaloguj się</a>
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

        email = ''
        errorMessage = ''

        async resetPassword() {
            try {
                await this.$axios.post(`reset-password/${this.email}`)
                this.$router.push('/login')
            } catch (e) {
                if (e.response.data.message) {
                    this.errorMessage = e.response.data.message
                } else {
                    this.errorMessage = 'Nieznany błąd'
                }
            }

        }
    }
</script>

<style scoped>

</style>
