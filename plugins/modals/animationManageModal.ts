import Vue from 'vue'
import AnimationManageModal from '~/components/modal/AnimationManageModal.vue';

const AnimationManageModalInstaller = {
    install(Vue) {
        Vue.mixin({
            mounted() {
                if (!Vue.prototype.$animationManageModal) {
                    Vue.prototype.$animationManageModal = new AnimationManageModal()
                    let plugin = document.createElement('div')
                    plugin.id = 'animationManageModal'
                    let app = document.getElementById('app')
                    if(!app) return
                    app.appendChild(plugin)
                    Vue.prototype.$animationManageModal.$mount('#animationManageModal')
                }
            }
        })

    }
}

Vue.use(AnimationManageModalInstaller)
