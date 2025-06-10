import CustomRange from './src/CustomRange.vue'
export default {
  install(app) {
    app.component('CustomRange', CustomRange)
  }
}
export { CustomRange }