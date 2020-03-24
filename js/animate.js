class EleAnimation {
  constructor({
    containerSel,
    options = {}
  }) {
    if (!containerSel) {
      throw new Error("Container must be specified!");
    }
    this.options = options;
    this.containerSel = containerSel;
    this._init();
  }

  _init () {
    let frag = new DocumentFragment(),
        container = document.querySelector(this.containerSel);
    this.container = container;
    frag.appendChild(this._generateContent(this.options));
    container.appendChild(frag);
    return true;
  }

  _generateContent (options) {
    let content = document.createElement('div'),
        contentStyle = options.content && options.content.style,
        style = {
          position: 'absolute',
          ...contentStyle
        };
    content.id = "animate";
    this._initStyle({
      dom: content,
      style
    });
    this.content = content;
    return content;
  }

  _initStyle ({
    dom,
    style
  }) {
    let styleKeys = Object.keys(style);
    for (let i = 0, len = styleKeys.length; i < len; i ++) {
      dom.style[styleKeys[i]] = style[styleKeys[i]];
    }
  }

  _generateAnimationFrameCallbackFunction (options) {
    let duration = options.duration || 3000,
        container = this.container,
        content = this.content,
        startTime = Date.now(),
        destination = container.clientWidth - content.clientWidth;
    const animationMathFunction = this._getAnimationFunction(this.options.animateFunction);

    let fn = () => {
      const deltaTime = Date.now() - startTime;
      if (deltaTime >= duration) {
        cancelAnimationFrame(this.timerID);
        if (options.infinite) {
          this.reset();
          this.run();
        }
        return;
      }
      if (deltaTime < duration) {
        content.style.left = destination * animationMathFunction(deltaTime / duration) + 'px';
      }
      this.timerID = requestAnimationFrame(fn);
    }
    return fn;
  }

  _getAnimationFunction (type) {
    if (typeof type === 'function') {
      return type;
    }
    return ({
      'linear': k => k,
      'log': k => Math.log2(k + 1),
      'const-dec': k => k ** (1/1.75),
      'ease-in-out': k => (k *= 2) < 1 ? 0.5 * k * k * k : 0.5 * ((k -= 2) * k * k + 2)
    })[type];
  }

  run () {
    let timerID;
    timerID = requestAnimationFrame(this._generateAnimationFrameCallbackFunction(this.options));
    this.timerID = timerID;
  }

  reset () {
    this._initStyle({
      dom: this.content,
      style: this.options.content && this.options.content.style
    });
  }

  stop () {
    cancelAnimationFrame(this.timerID);
    this.reset();
  }
}