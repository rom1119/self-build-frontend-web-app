import BackgroundManageModal from '~/components/modal/BackgroundManageModal.vue'
import Vue from 'vue'

const BackgroundManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$backgroundManageModal) {
                    Vue.prototype.$backgroundManageModal = new BackgroundManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'backgroundManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$backgroundManageModal.$mount('#backgroundManageModal')
                }
            }
        })

    }
}

Vue.use(BackgroundManageModalInstaller)
