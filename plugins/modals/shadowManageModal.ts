import Vue from 'vue'
import ShadowManageModal from '~/components/modal/ShadowManageModal.vue';

const ShadowManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$shadowManageModal) {
                    Vue.prototype.$shadowManageModal = new ShadowManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'shadowManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$shadowManageModal.$mount('#shadowManageModal')
                }
            }
        })

    }
}

Vue.use(ShadowManageModalInstaller)
