<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>
export default {
    name: 'IconSvg',
    props: {
        iconClass: {
            type: String,
            required: true,
        },
    },
    computed: {
        iconName() {
            return `#${this.iconClass}`
        },
    },
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  font-size: 18px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
