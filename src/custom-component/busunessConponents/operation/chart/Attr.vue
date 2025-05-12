<template>
    <div class="attr-list">
        <CommonAttr></CommonAttr>
        <charEdit></charEdit>
    </div>
</template>

<script>
import CommonAttr from '@/custom-component/common/CommonAttr'
import charEdit from './charEdit'

export default {
    name: 'ChartAttr', //
    components: { CommonAttr, charEdit },
    computed: {
        curComponent() {
            return this.$store.state.curComponent
        },
    },
}
</script>
