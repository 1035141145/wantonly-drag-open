<template>
    <div class="attr-list">
        <CommonAttr></CommonAttr>
    </div>
</template>

<script>
import CommonAttr from '@/custom-component/common/CommonAttr'

export default {
    name: 'BorderBox11Attr', //
    components: { CommonAttr },
    computed: {
        curComponent() {
            return this.$store.state.curComponent
        },
    },
}
</script>
