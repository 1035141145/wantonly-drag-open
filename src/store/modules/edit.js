const edit = {
    state: {
        addFundDialog: {
            title: '新增',
            type: 'add',
        },
        key: 1,
        search: {
            startTime: '',
            endTime: '',
            name: '',
        },
        searchBtnDisabled: true,
    },
    getters: {
        key: state => state.key,
        addFundDialog: state => state.addFundDialog,
        search: state => state.search,
        searchBtnDisabled: state => state.searchBtnDisabled,
    },
    mutations: {
        SET_DIALOG_TITLE: (state, type) => {
            if (type === 'add') {
                state.addFundDialog.title = '新增'
                state.addFundDialog.type = 'add'
            } else {
                state.addFundDialog.title = '编辑'
                state.addFundDialog.type = 'edit'
            }
        },
        SET_SEARCH: (state, payload) => {
            state.search = payload
        },
        Set_Key: (state, payload) => {
            state.key = payload
        },
        SET_SEARCHBTN_DISABLED: (state, payload) => {
            state.searchBtnDisabled = payload
        },
    },
    actions: {

    },
}

export default edit
