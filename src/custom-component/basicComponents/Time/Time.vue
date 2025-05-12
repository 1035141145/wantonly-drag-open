<template>
    <div class="box" :style="{ 'font-size': element.style.fontSize, border: element.style.borderWidth, 'border-color': element.style.borderColor }">
        <p class="boxDay">{{ dateWeek }}</p>
        <p class="boxTime">{{ dateDay }}</p>
        <p class="boxDate">{{ dateYear }}</p>
    </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
    name: 'Time',
    props: { element: { type: Object, default: () => {} } },

    data() {
        return {
            dateDay: null,
            dateYear: null,
            dateWeek: null,
            weekday: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            timer: null,
        }
    },
    mounted() {
        this.timer = setInterval(() => {
            const date = dayjs(new Date())
            this.dateDay = date.format('HH:mm:ss')
            this.dateYear = date.format('YYYY-MM-DD')
            this.dateWeek = date.format(this.weekday[date.day()])
        }, 1000)
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    },
}
</script>

<style scoped>
.box {
    display: flex;
    align-items: center;
    justify-content: center;
}
.boxDay {
    /* font-size: 16px; */
}
.boxTime {
    /* font-size: 16px; */
    margin: 0 15px;
}
.boxDate {
    /* font-size: 14px; */
}
</style>
