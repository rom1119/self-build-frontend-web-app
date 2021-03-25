import SvgManageModal from '~/components/modal/SvgManageModal.vue'
import Vue from 'vue'

const SvgManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$svgManageModal) {
                    Vue.prototype.$svgManageModal = new SvgManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'svgManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$svgManageModal.$mount('#svgManageModal')
                }
            }
        })

    }
}

Vue.use(SvgManageModalInstaller)
