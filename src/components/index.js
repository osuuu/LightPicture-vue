import Empty from './Empty'
import Account from './Account.vue'
import PortraitSelect from './PortraitSelect.vue'
import UserFloat from './UserFloat.vue'
import osCopy from './Copy.vue'
import Notice from './Notice.vue'
import Capacity from './Capacity.vue'

export default {
    install(Vue, options) {
        Vue.component('Empty', Empty)
        Vue.component('Account', Account)
        Vue.component('PortraitSelect', PortraitSelect)
        Vue.component('UserFloat', UserFloat)
        Vue.component('osCopy', osCopy)
        Vue.component('Notice', Notice)
        Vue.component('Capacity', Capacity)
　　}
}     