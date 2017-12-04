/**
 * Created by lichun on 2017/1/19.
 */
const express = require('express')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const forward = require('forward-request')
const webpackConfig = require('./build/webpack.dev.config.js')

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3001
app.set('port', port)

if (process.env.NODE_ENV === 'production') {
    const compression = require('compression')
    app.use(compression())
    app.use(express.static(path.join(__dirname, 'dist'), {
        maxAge: '1d'
    }))
} else {
    const compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        quiet: true,
        publicPath: webpackConfig.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler, {
        log: () => { }
    }))
    app.use((req, resp, next) => {
        if (~req.originalUrl.indexOf('/yijia')) {
            forward({
                req,
                resp,
                host: 'weixin.yijiahx.com',
                ip: 'weixin.yijiahx.com',
                path: req.originalUrl.replace('/yijia', ''),
                showLog: true
            })
        } else {
            next()
        }
    })
}

app.listen(port, host, () => {
    console.log('Server listening on ' + host + ':' + port)
})
