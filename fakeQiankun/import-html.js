import { fetchResource } from './fetch-resource'

export const importHTML = async url => {
  // const template 
  const html = await fetchResource(url)
  const template = document.createElement('div')
  template.innerHTML = html

  const scripts = document.querySelectorAll('script')

  // 解析 script
  const getExternalScripts = () => {
    // 存在两种 script src='./xxx' 和 innerHtml

    return Promise.all(
      Array
      .from(scripts)
      .map(script => {
        const src = script.getAttribute('src')

        if (src) {
          return fetch(
            src.startsWith('http') ? src : `${url}${src}`
          )
        }
        else {
          return script.innerHTML
        }

      })
    )
  }

  const execScripts = async () => {
    const scripts = await getExternalScripts()

    scripts.forEach(script => {
      eval(script)
    })

    return module.exports
  }

  return {
    template,
    execScripts,
    getExternalScripts,
  }
}
