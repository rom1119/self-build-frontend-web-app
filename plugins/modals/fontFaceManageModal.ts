import ImgManageModal from '~/components/modal/ImgManageModal.vue'
import Vue from 'vue'

const ImgManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$imgManageModal) {
                    Vue.prototype.$imgManageModal = new ImgManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'imgManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$imgManageModal.$mount('#imgManageModal')
                }
            }
        })

    }
}

Vue.use(ImgManageModalInstaller)
