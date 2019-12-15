import Vue from 'vue'
import BoxModelManageModal from '~/components/modal/BoxModelManageModal.vue';

const BoxModelManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$boxModelManageModal) {
                    Vue.prototype.$boxModelManageModal = new BoxModelManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'boxModelManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$boxModelManageModal.$mount('#boxModelManageModal')
                }
            }
        })

    }
}

Vue.use(BoxModelManageModalInstaller)
