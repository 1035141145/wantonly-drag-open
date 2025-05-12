import Vue from 'vue'

export function deepCopy(target) {
    if (typeof target == 'object') {
        const result = Array.isArray(target) ? [] : {}
        for (const key in target) {
            if (typeof target[key] == 'object') {
                result[key] = deepCopy(target[key])
            } else {
                result[key] = target[key]
            }
        }

        return result
    }

    return target
}

export function swap(arr, i, j) {
    const temp = arr[i]
    Vue.set(arr, i, arr[j])
    Vue.set(arr, j, temp)
}

export function $(selector) {
    return document.querySelector(selector)
}

const components = ['VText', 'RectShape', 'CircleShape']
export function isPreventDrop(component) {
    return !components.includes(component) && !component.startsWith('SVG')
}

/**
 * 页面等比缩放
 * @param el 页面根
 * @param width 设计宽度
 * @param height 设计高度
 */
export const pageScale = (el, width, height) => {
    const scaleX = document.documentElement.clientWidth / width
    const scaleY = document.documentElement.clientHeight / height
    const scale = Math.min(scaleX, scaleY)
    el.style.transform = `scale(${scale}) translate(-50%)`
    // const transform = `scale(${scale}) translate(-50%)`
    // return transform
}
