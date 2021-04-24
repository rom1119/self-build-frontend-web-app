import LayoutCreatorInfoComponent from '../components/LayoutCreatorInfoComponent.vue'
import Vue from 'vue'

const LayoutCreatorInfoComponentInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$layoutCreatorInfo) {
                    Vue.prototype.$layoutCreatorInfo = new LayoutCreatorInfoComponent()
                    let layoutCreatorInfo = document.createElement('div')
                    layoutCreatorInfo.id = 'layoutCreatorInfo'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(layoutCreatorInfo)
                    Vue.prototype.$layoutCreatorInfo.$mount('#layoutCreatorInfo')
                }
            }
        })

    }
}

Vue.use(LayoutCreatorInfoComponentInstaller)
