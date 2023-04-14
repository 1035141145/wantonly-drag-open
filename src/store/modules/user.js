import * as mUtils from '@/utils/mUtils'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        name: '',
        avatar: '',
        token: getToken('Token'),
        roles: [],
        browserHeaderTitle: mUtils.getStore('browserHeaderTitle') || '企业级指标化看板解决方案',
    },
    getters: {
        token: state => state.token,
        roles: state => state.roles,
        avatar: state => state.avatar,
        name: state => state.name,
        browserHeaderTitle: state => state.browserHeaderTitle,
    },
    mutations: {
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_BROWSERHEADERTITLE: (state, action) => {
            state.browserHeaderTitle = action.browserHeaderTitle
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
    },
    actions: {
    // 登出
        LogOut({ commit, reqData }) {

        },
        // 动态修改权限;本实例中,role和token是相同的;
        ChangeRoles({ commit }, role) {
            return new Promise(resolve => {
                const token = role
                setToken('Token', token)
            })
        },

    },
}

export default user
