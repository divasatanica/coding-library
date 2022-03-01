
import { debounce } from '../utils/function'

/**
 * 获取元素距离页面顶部的距离
 * @param {Element} el
 * @returns {Number}
 */
function getOffsetTop (el) {
  if (!el) {
    return 0
  }

  let res = 0
  let parent = el

  while (parent !== null) {
    res += parent.offsetTop
    parent = parent.offsetParent
  }

  return res
}

const canUseIntersectionObserver = typeof window !== 'undefined' &&
  'IntersectionObserver' in window &&
  window.IntersectionObserver.toString().indexOf('[native code]') > -1
const kGlobalObserver = Symbol('GlobalIntersectionObserver')
const threshold = -50
// 使用一个全局的 IntersectionObserver 实例对不同的元素进行观察
// 再用 DOM 事件机制去通知到对应的元素
// 把实例化 IntersectionObserver 时的回调与实际给对应元素设置图片的回调进行分离
const getGlobalObserver = () => {
  if (window[kGlobalObserver]) {
    return window[kGlobalObserver]
  }
  window[kGlobalObserver] = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const { isIntersecting } = entry
      if (isIntersecting) {
        entry.target.dispatchEvent(
          new CustomEvent('img-lazyloaded')
        )
      }
    })
  }, {
    rootMargin: `0px 0px ${-threshold}px 0px`
  })

  return window[kGlobalObserver]
}

const imageGetter = (type, el) => {
  switch (type) {
    case 'background': {
      return el.style['background-image']
    }
    case 'img': {
      return el.src
    }
  }
}
const getImageSetter = (type, src) => {
  switch (type) {
    case 'background': {
      return el => {
        el.style['background-image'] = `url(${src})`
      }
    }
    case 'img': {
      return el => {
        el.src = src
      }
    }
  }
}

const canUseLoadingLazy = type => {
  return type === 'img' && 'loading' in HTMLImageElement.prototype
}

const setupObserver = (el, { type, error, src }) => {
  el.addEventListener('error', function () {
    const imageSetter = getImageSetter(type, error)
    imageSetter(this)
  })

  if (canUseIntersectionObserver) {
    const observer = getGlobalObserver()

    let lazyLoadedCallback = () => {
      const imageSetter = getImageSetter(type, src || error)
      imageSetter(el)

      observer.unobserve(el)
      el.removeEventListener('img-lazyloaded', lazyLoadedCallback)
      lazyLoadedCallback = null
      el.lazyLoadedCallback = null
    }

    el.addEventListener('img-lazyloaded', lazyLoadedCallback)
    el.lazyLoadedCallback = lazyLoadedCallback
    observer.observe(el)
  } else {
    let _resolve
    const promise = new Promise(resolve => {
      _resolve = resolve
    })
    let scrollCallback = debounce(() => {
      // 同步上面的阈值设定
      if (window.scrollY + window.innerHeight - getOffsetTop(el) >= threshold) {
        const imageSetter = getImageSetter(type, src || error)
        imageSetter(el)
        window.removeEventListener('scroll', scrollCallback)
        scrollCallback = null
        el.lazyLoadedCallback = null
        _resolve(false)
      }
      _resolve(true)
    }, 200)

    // 因为 scrollCallback 用了 debounce 去调用
    // 所以需要用 promise 来保证时序,如果 needListen 为 false
    // 代表第一次固定执行回调时,已经将图片加载好了
    // 所以不需要再添加监听器
    promise.then(needListen => {
      if (needListen) {
        el.lazyLoadedCallback = scrollCallback
        window.addEventListener('scroll', scrollCallback)
      }
    })
    scrollCallback()
  }
}

const directive = {
  inserted (el, { value, arg }) {
    // 2021.1.27 添加一个 lazy 开关,表示是否要执行懒加载,默认为 true
    // 要关闭的话必须显式传入 false
    const { src, error, lazy = true } = value
    const type = arg || 'background'
    if (imageGetter(type, el)) {
      return
    }

    // 如果懒加载开关为关闭状态,则直接加载图片
    if (lazy === false) {
      return getImageSetter(type, src)(el)
    }

    // 支持原生懒加载的浏览器中使用该属性来实现懒加载
    if (canUseLoadingLazy(type)) {
      el.loading = 'lazy'
      el.src = src
    } else {
      // 加上 100ms 用于处理页面抖动产生的 Intersecting 状态不正确的问题
      setTimeout(() => setupObserver(el, { src, error, type }), 100)
    }
  },

  update (el, { value, arg }) {
    const { src, error, lazy = true } = value
    const type = arg || 'background'

    if (el.src && el.src === src) {
      return
    }
    // 如果懒加载开关为关闭状态,则直接更新图片
    if (lazy === false) {
      return getImageSetter(type, src)(el)
    }

    if (canUseLoadingLazy(type)) {
      el.src = src || error
      return
    }

    setupObserver(el, { type, error, src })
  },

  // 如果到这个组件的生命周期结束都没有滚动到视口内
  // 执行清除副作用的逻辑
  unbind (el) {
    if (el.lazyLoadedCallback != null) {
      const observer = getGlobalObserver()
      observer.unobserve(el)
      el.removeEventListener('img-lazyloaded', el.lazyLoadedCallback)
      window.removeEventListener('scroll', el.lazyLoadedCallback)
      el.lazyLoadedCallback = null
    }
  }
}

export function initLazyloadDirective (Vue) {
  Vue.use({
    install (Vue) {
      Vue.directive('lazyload', directive)
    }
  })
}
