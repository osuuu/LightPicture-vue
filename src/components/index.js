// +----------------------------------------------------------------------
// | LightPicture [ 图床 ]
// +----------------------------------------------------------------------
// | 企业团队图片资源管理系统
// +----------------------------------------------------------------------
// | Github: https://github.com/osuuu/LightPicture
// +----------------------------------------------------------------------
// | Copyright © http://picture.h234.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: Team <admin@osuu.net>
// +----------------------------------------------------------------------
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