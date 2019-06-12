'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"http://47.244.194.178:8080"',//192.168.59.1:8888
  APP_ID:'"wx0739baa9f03240c5"'
})
