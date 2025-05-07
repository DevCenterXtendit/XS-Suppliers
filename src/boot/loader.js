import { boot } from 'quasar/wrappers'
import { ref, readonly } from 'vue'

const isLoading = ref(false)

const loader = {
  get isLoading() {
    return isLoading.value
  },
  show() {
    isLoading.value = true
  },
  hide() {
    isLoading.value = false
  },
  toggle() {
    isLoading.value = !isLoading.value
  },
  get state() {
    return readonly(isLoading)
  }
}

export { loader }

export default boot(({ app }) => {
  app.config.globalProperties.$loader = loader
})
