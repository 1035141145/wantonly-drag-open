<template>
    <table class="v-table">
        <tbody>
            <tr
                v-for="(item, index) in propValue.data"
                :key="index"
                :class="{
                    stripe: propValue.stripe && index % 2,
                    bold: propValue.thBold && index === 0
                }"
            >
                <td v-for="(e, i) in item" :key="i">{{ e }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import request from '@/utils/request'
import OnEvent from '@/custom-component/common/OnEvent'

export default {
    name: 'VTable',
    extends: OnEvent,
    props: {
        propValue: {
            type: Object,
            default: () => {},
        },
        request: {
            type: Object,
            default: () => {},
        },
        element: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            cancelRequest: null,
        }
    },
    created() {
        if (this.request) {
            this.cancelRequest = request(this.request, this.propValue, 'data')
        }
    },
    beforeDestroy() {
        this.request && this.cancelRequest()
    },
}
</script>

<style lang="scss" scoped>
.v-table {
    border-collapse: collapse;
    table-layout: fixed;
    word-break: break-all;
    word-wrap: break-word;

    td {
        border: 1px solid #ebeef5;
        height: 40px;
        width: 60px;
        padding: 10px;
    }

    .bold {
        font-weight: bold;
    }

    .stripe {
        background-color: #fafafa;
    }
}
</style>
