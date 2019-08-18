import AlertsContainer from '../components/AlertsContainer.vue'
import Vue from 'vue'

const AlertsContainerInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$alertsContainer) {
                    Vue.prototype.$alertsContainer = new AlertsContainer()
                    let alertsContainer = document.createElement('div')
                    alertsContainer.id = 'alertsContainer'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(alertsContainer)
                    Vue.prototype.$alertsContainer.$mount('#alertsContainer')
                }
            }
        })

    }
}

Vue.use(AlertsContainerInstaller)
