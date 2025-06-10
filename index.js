import './dist/style.css'
import VueDualThumbRange from './src/VueDualThumbRange.vue'
export default {
  install(app) {
    app.component('VueDualThumbRange', VueDualThumbRange)
  }
}
export { VueDualThumbRange }