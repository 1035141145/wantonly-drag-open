<template>
    <div class="svg-star-container">
        <svg
            version="1.1"
            baseProfile="full"
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon
                ref="star"
                :points="points"
                :stroke="element.style.borderColor"
                :fill="element.style.backgroundColor"
                stroke-width="1"
            />
        </svg>
        <v-text :prop-value="element.propValue" :element="element" />
    </div>
</template>

<script>
import OnEvent from '@/custom-component/common/OnEvent'

export default {
    name: 'SVGStar',
    extends: OnEvent,
    props: {
        propValue: {
            type: String,
            required: true,
            default: '',
        },
        element: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            points: '',
        }
    },
    watch: {
        'element.style.width': function () {
            this.draw()
        },
        'element.style.height': function () {
            this.draw()
        },
    },
    mounted() {
        this.draw()
    },
    methods: {
        draw() {
            const { width, height } = this.element.style
            this.drawPolygon(width, height)
        },

        drawPolygon(width, height) {
            // 五角星十个坐标点的比例集合
            const points = [
                [0.5, 0],
                [0.625, 0.375],
                [1, 0.375],
                [0.75, 0.625],
                [0.875, 1],
                [0.5, 0.75],
                [0.125, 1],
                [0.25, 0.625],
                [0, 0.375],
                [0.375, 0.375],
            ]

            const coordinatePoints = points.map(point => width * point[0] + ' ' + height * point[1])
            this.points = coordinatePoints.toString()
        },
    },
}
</script>

<style lang="scss" scoped>
.svg-star-container {
    width: 100%;
    height: 100%;

    svg {
        width: 100%;
        height: 100%;
    }

    .v-text {
        position: absolute;
        top: 58%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: 40%;
    }
}
</style>
