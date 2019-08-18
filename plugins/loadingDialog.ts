import LoadingDialog from './../components/LoadingDialog.vue'
import Vue from 'vue'

const LoadingDialogInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$loadingDialog) {
                    Vue.prototype.$loadingDialog = new LoadingDialog()
                    let loadingDialogContainer = document.createElement('div')
                    loadingDialogContainer.id = 'loadingDialogContainer'
                    let app = document.getElementById('app')
                    if (!app) return
                    app.appendChild(loadingDialogContainer)
                    Vue.prototype.$loadingDialog.$mount('#loadingDialogContainer')
                }
            }
        })

    }
}

Vue.use(LoadingDialogInstaller)
