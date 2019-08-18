<template>
    <div class="content content--notch-bottom">
        <div class="row pb-4">
            <div class="col-2 align-self-center text-center">

                <file-upload
                    v-model="files"
                    @input-filter="inputFilter"
                    @input-file="inputFile"
                    :post-action="uploadUrl"
                    ref="upload"
                >
                    <div v-if="$refs.upload && $refs.upload.active" class="spinner-grow" role="status" style="width: 96px; height: 96px;" >
                        <span class="sr-only">Loading...</span>
                    </div>
                    <img v-else :src="localData.logo ? localData.logo : 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'" style="width: 96px; height: 96px;" /><br>
<!--                    <button class="btn btn-primary mt-1" v-if="!localData.logo">Dodaj zdjęcie profilowe</button>-->
<!--                    <button class="btn btn-primary mt-1" v-else>Zmień zdjęcie profilowe</button>-->
                </file-upload>

            </div>
            <div class="col-10 align-self-center border-left">
                <div class="row justify-content-end">
                    <div class="col-5">
                        <div class="form-group mb-0">
                            <label>Imię i naziwsko</label>
                            <input v-model="localData.name" type="text" class="form-control" :class="{'is-invalid': errorMessages.name[0]}">
                            <div class="invalid-feedback">
                                {{ errorMessages.name[0] }}
                            </div>
                        </div>
                    </div>

                    <div class="col-5">
                        <div class="form-group mb-0" >
                            <label>e-mail</label>
                            <input v-model="localData.email" type="email" class="form-control" :class="{'is-invalid': errorMessages.email[0]}">
                            <div class="invalid-feedback">
                                {{ errorMessages.email[0] }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr class="hr">

        <div class="row mt-5">
            <div class="col-12">
                <h3 class="heading heading--title mb-3">Zmiana hasła</h3>
            </div>
        </div>

        <div class="row mb-5">
            <div class="col-4">
                <div class="form-group">
                    <label>Aktualne hasło</label>
                    <input v-model="currentPassword" type="password" class="form-control" aria-describedby="emailHelp" :class="{'is-invalid': errorMessages.current_password[0]}">
                    <div class="invalid-feedback">
                        {{ errorMessages.current_password[0] }}
                    </div>
                </div>
            </div>

            <div class="col-4">
                <div class="form-group">
                    <label>Nowe hasło</label>
                    <input v-model="newPassword" type="password" class="form-control" :class="{'is-invalid': errorMessages.plain_password.first[0]}">
                    <div class="invalid-feedback">
                        {{ errorMessages.plain_password.first[0] }}
                    </div>
                </div>
            </div>

            <div class="col-4">
                <div class="form-group">
                    <label>Potwierdź hasło</label>
                    <input v-model="newPasswordRepeat" type="password" class="form-control" :class="{'is-invalid': errorMessages.plain_password.second[0]}">
                    <div class="invalid-feedback">
                        {{ errorMessages.plain_password.second[0] }}
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-auto mx-auto">
                <button class="btn btn-primary px-5" @click="changePassword">Zapisz zmiany</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'

    export type FieldsErrors = {
        [fieldName: string]: string | FieldsErrors
    }

    @Component({
        middleware: 'auth'
    })
    export default class AccountSettingsPage extends Vue {
        $refs: {
            upload: any
        }


        localData = {}

        currentPassword = ''
        newPassword = ''
        newPasswordRepeat = ''

        files = []

        defaultItemData = {
            current_password: '',
            name: '',
            email: '',
            plain_password: {
                first: '',
                second: ''
            }
        }

        serverErrors: any = {}

        get errorMessages(): FieldsErrors {
            let myErrors = {}
            if(this.defaultItemData) myErrors = {...this.defaultItemData}

            for (let keyName in myErrors) {
                myErrors[keyName] = this.assignErrors(myErrors[keyName], this.serverErrors[keyName])

            }

            return myErrors
        }

        private assignErrors(obj, errorsObj) {
            let objClone = {}
            if (!errorsObj) errorsObj = ''
            if (errorsObj && errorsObj.children) errorsObj = errorsObj.children
            if (typeof obj === 'object') {
                objClone = {...obj}
                for (let keyName in obj) {
                    objClone[keyName] = this.assignErrors(obj[keyName], errorsObj[keyName])
                }
            } else {
                if (errorsObj && errorsObj.errors) {
                    objClone = errorsObj.errors
                } else {
                    objClone = []
                }
            }

            return objClone
        }

        get uploadUrl() {
            return 'http://' + process.env.API_HOST + `auth/users/upload-avatar`
        }

        async changePassword() {
            this.serverErrors = {}
            try {
                let user = await this.$axios.$put(`auth/users`, {
                    ...this.localData,
                    current_password: this.currentPassword,
                    plain_password: {
                        first: this.newPassword,
                        second: this.newPasswordRepeat
                    }
                })

                this.currentPassword = this.newPassword = this.newPasswordRepeat = ''
            }catch (e) {
                if(e.response.status == 400) {
                    this.serverErrors = e.response.data.errors.children
                }else {
                    alert('ERROR 500')
                }
            }

        }

        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
                    alert('Your choice is not a picture')
                    return prevent()
                }
            }
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                newFile.url = ''
                // @ts-ignore
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.url = URL.createObjectURL(newFile.file)
                }
            }
        }

        inputFile(newFile, oldFile) {
            if (newFile && !oldFile) {
                // Add file
            }

            if (newFile && oldFile) {
                // Update file

                // Start upload
                if (newFile.active !== oldFile.active) {
                    // console.log('Start upload', newFile.active, newFile)

                    // min size
                    if (newFile.size >= 0 && newFile.size < 100 * 1024) {
                        newFile = this.$refs.upload.update(newFile, {error: 'size'})
                    }
                }

                // // Upload progress
                // if (newFile.progress !== oldFile.progress) {
                //     console.log('progress', newFile.progress, newFile)
                // }
                //
                // // Upload error
                // if (newFile.error !== oldFile.error) {
                //     console.log('error', newFile.error, newFile)
                // }

                // Uploaded successfully
                if (newFile.success !== oldFile.success) {
                    console.log('success', newFile.success, newFile)
                    this.localData = newFile.response
                }
            }


            // Automatic upload
            if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                if (!this.$refs.upload.active) {
                    this.$refs.upload.active = true
                }
            }
        }

        mounted() {
            this.localData = {...this.$auth.user}
        }
    }
</script>

<style scoped>

</style>
