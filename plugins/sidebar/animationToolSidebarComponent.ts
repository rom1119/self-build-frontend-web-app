import AnimationToolSidebar from '../../components/AnimationToolSidebar.vue'
import Vue from 'vue'

const AnimationToolSidebarInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$animationToolSidebar) {
                    Vue.prototype.$animationToolSidebar = new AnimationToolSidebar()
                    let el = document.createElement('div')
                    el.id = 'animationToolSidebar'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(el)
                    Vue.prototype.$animationToolSidebar.$mount('#animationToolSidebar')
                }
            }
        })

    }
}

Vue.use(AnimationToolSidebarInstaller)
