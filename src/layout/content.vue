<template>
    <div class="">
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {},
}
</script>

<style scoped lang='scss'>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
