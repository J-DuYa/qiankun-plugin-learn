import { fetchResource } from "./fetch-resource"

export const importHtml = async (url) => {
  const html = await fetchResource(url)
  const template = document.createElement('div')
  template.innerHTML = html

  // 文档内的以及外链
  const scripts = template.querySelectorAll('script')

  const getExternalScripts = () => {
    return Promise.all(
      Array.from(scripts).map(script => {
        const src = script.getAttribute('src')
        if (!src) {
          return Promise.resolve(script.innerHTML)
        } else {
          return fetchResource(
            src.startsWith('http') ? src : `${url}${src}`,
          )
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
