import FontFaceManageModal from '~/components/modal/FontFaceManageModal.vue'
import Vue from 'vue'

const FontFaceManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$fontFaceManageModal) {
                    Vue.prototype.$fontFaceManageModal = new FontFaceManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'fontFaceManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$fontFaceManageModal.$mount('#fontFaceManageModal')
                }
            }
        })

    }
}

Vue.use(FontFaceManageModalInstaller)
