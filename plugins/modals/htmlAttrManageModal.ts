import Vue from 'vue'
import HtmlAttrManageModal from '~/components/modal/HtmlAttrManageModal.vue';

const HtmlAttrModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$htmlAttrManageModal) {
                    Vue.prototype.$htmlAttrManageModal = new HtmlAttrManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'htmlAttrManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$htmlAttrManageModal.$mount('#htmlAttrManageModal')
                }
            }
        })

    }
}

Vue.use(HtmlAttrModalInstaller)
