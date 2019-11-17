import TextManageModal from '~/components/modal/TextManageModal.vue'
import Vue from 'vue'

const TextManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$textManageModal) {
                    Vue.prototype.$textManageModal = new TextManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'textManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$textManageModal.$mount('#textManageModal')
                }
            }
        })

    }
}

Vue.use(TextManageModalInstaller)
