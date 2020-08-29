import Vue from 'vue'
import GradientManageModal from '~/components/modal/GradientManageModal.vue';

const GradientManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$gradientManageModal) {
                    Vue.prototype.$gradientManageModal = new GradientManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'gradientManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$gradientManageModal.$mount('#gradientManageModal')
                }
            }
        })

    }
}

Vue.use(GradientManageModalInstaller)
