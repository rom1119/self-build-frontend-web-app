import ConfirmDialog from '../components/ConfirmDialog.vue'
import Vue from 'vue'

// const ConfirmDialogInstaller = {
//     install(Vue) {
//         Vue.mixin({
//             mounted() {
//                 if (!Vue.prototype.$confirmDialog) {
//                     Vue.prototype.$confirmDialog = new ConfirmDialog()
//                     let confirmDialog = document.createElement('div')
//                     confirmDialog.id = 'confirmDialog'
//                     let app = document.getElementById('app')
//                     if(!app) return
//                     app.appendChild(confirmDialog)
//                     Vue.prototype.$confirmDialog.$mount('#confirmDialog')
//                 }
//             }
//         })

//     }
// }

// Vue.use(ConfirmDialogInstaller)
