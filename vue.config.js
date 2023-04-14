const CompressionPlugin = require('compression-webpack-plugin')

// const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: './',
    outputDir: './dist',
    assetsDir: 'static',
    filenameHashing: true, // false 来关闭文件名哈希
    lintOnSave: false, // 关闭eslint
    // 打包时不生成.map文件
    productionSourceMap: false,
    configureWebpack: () => ({
        plugins: [
            new CompressionPlugin({
                test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
                threshold: 5120, // 归档需要进行压缩的文件大小最小值，这个对 10K 以上的进行压缩
                deleteOriginalAssets: false, // 是否删除原文件
            }),
        ],
    }),
}
