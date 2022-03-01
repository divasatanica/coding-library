import { initLazyloadDirective } from './lazyload'

const directives = [
  initLazyloadDirective
]

export function initExtendDirectives (Vue) {
  directives.forEach(directiveInitiator => {
    directiveInitiator(Vue)
  })
}
