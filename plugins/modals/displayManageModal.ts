import Vue from 'vue'
import DisplayManageModal from '~/components/modal/DisplayManageModal.vue';

const DisplayManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$displayManageModal) {
                    Vue.prototype.$displayManageModal = new DisplayManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'displayManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$displayManageModal.$mount('#displayManageModal')
                }
            }
        })

    }
}

Vue.use(DisplayManageModalInstaller)
