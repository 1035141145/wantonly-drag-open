<template>
    <div class="line-shape"></div>
</template>

<script>
import OnEvent from '../common/OnEvent'

export default {
    name: 'LineShape', 
    extends: OnEvent,
}
</script>

<style lang="scss" scoped>
.line-shape {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
