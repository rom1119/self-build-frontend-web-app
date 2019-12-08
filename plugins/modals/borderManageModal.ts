import BorderManageModal from '~/components/modal/BorderManageModal.vue'
import Vue from 'vue'

const BorderManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$borderManageModal) {
                    Vue.prototype.$borderManageModal = new BorderManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'borderManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$borderManageModal.$mount('#borderManageModal')
                }
            }
        })

    }
}

Vue.use(BorderManageModalInstaller)
