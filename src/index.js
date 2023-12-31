import Button from './Button/index.vue'

export function install(Vue) {
  if (install.installed) {
    return
  }

  install.installed = true
  
  Vue.component(Button.name, Button)
}

const plugin = {
  install,
}

let GlobalVue = null

if (typeof window !== undefined) {
  GlobalVue = window.vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}

if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default Button
