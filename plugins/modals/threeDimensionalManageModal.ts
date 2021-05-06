import ThreeDimensionalManageModal from '~/components/modal/ThreeDimensionalManageModal.vue'
import Vue from 'vue'

const ThreeDimensionalManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$threeDimensionalManageModal) {
                    Vue.prototype.$threeDimensionalManageModal = new ThreeDimensionalManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'threeDimensionalManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$threeDimensionalManageModal.$mount('#threeDimensionalManageModal')
                }
            }
        })

    }
}

Vue.use(ThreeDimensionalManageModalInstaller)
