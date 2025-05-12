// // 防抖
// const debounce = (func, delay) => {
//     let timer = null
//     return function () {
//         let context = this
//         // eslint-disable-next-line prefer-rest-params
//         let args = arguments
//         if (timer) {
//             clearTimeout(timer)
//         }
//         timer = setTimeout(() => {
//             func.apply(context, args)
//             timer = null
//         }, delay)
//     }
// }

// export default debounce

/**
   * @desc 函数防抖
   * @param fn 函数
   * @param delay 延迟执行毫秒数 默认0.5s
   */
export function debounce(fn, delay) {
    // eslint-disable-next-line no-var, no-redeclare
    var delay = delay || 1000
    let timer
    return function () {
        console.log('调用了debounce方法')
        // eslint-disable-next-line prefer-rest-params
        let args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, args)
        }, delay)
    }
}
    
/**
     * @desc 函数节流
     * @param fn 函数
     * @param interval 函数执行间隔时间毫秒数 默认1s
     */
export function throttle(fn, interval) {
    let last
    let timer
    // eslint-disable-next-line no-var, no-redeclare
    var interval = interval || 1000
    return function () {
        console.log('调用了throttle方法')
        let th = this
        // eslint-disable-next-line prefer-rest-params
        let args = arguments
        let now = +new Date()
        if (last && now - last < interval) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                last = now
                fn.apply(th, args)
            }, interval)
        } else {
            last = now
            fn.apply(th, args)
        }
    }
}
