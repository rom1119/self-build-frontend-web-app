import LayoutCreatorModeComponent from '../components/LayoutCreatorModeComponent.vue'
import Vue from 'vue'

const LayoutCreatorModeComponentInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$layoutCreatorMode) {
                    Vue.prototype.$layoutCreatorMode = new LayoutCreatorModeComponent()
                    let layoutCreatorMode = document.createElement('div')
                    layoutCreatorMode.id = 'layoutCreatorMode'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(layoutCreatorMode)
                    Vue.prototype.$layoutCreatorMode.$mount('#layoutCreatorMode')
                }
            }
        })

    }
}

Vue.use(LayoutCreatorModeComponentInstaller)
