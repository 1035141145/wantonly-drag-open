<template>
    <div class="fillcontain">
        <p>{{ topTitle }}</p>
    </div>
</template>

<script>    
import { mapGetters } from 'vuex'

export default {
    name: 'MoneyData',
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['topTitle']),
    },
    created() {
            
    },
    methods: {

    },
}

</script>

<style lang="scss" scoped>

</style>