var script = {
  data() {
    return {
      books: [],
      selected: false,
      selectedBook: {
        volume: null,
        coverImage: null,
        title: null,
        publishedAt: null,
        description: null,
        price: null
      }
    };
  },
  mounted: function () {
    axios
      .get("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/books.json")
      .then((res) => {
        this.$data.books = res.data.books;
      });
  },
  methods: {
    selectBook(book) {
      this.$data.selected = true;
      this.$data.selectedBook = book;
    },
    closeMenu() {
      this.$data.selected = false;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "global-wrapper" },
    [
      _c("div", { staticClass: "floor-wrapper" }, [
        _c("div", { staticClass: "floor" }, [
          _c(
            "div",
            { staticClass: "book-list" },
            [
              _vm._l(_vm.$data.books, function(book) {
                return [
                  _c(
                    "div",
                    {
                      staticClass: "book-item",
                      on: {
                        click: function($event) {
                          return _vm.selectBook(book)
                        }
                      }
                    },
                    [
                      _c("img", {
                        staticClass: "cover",
                        attrs: { src: book.coverImage }
                      }),
                      _c("div", { staticClass: "back" })
                    ]
                  )
                ]
              })
            ],
            2
          )
        ])
      ]),
      _vm.$data.selected
        ? [
            _c("div", {
              staticClass: "menu-overlay",
              on: { click: _vm.closeMenu }
            })
          ]
        : _vm._e(),
      _c(
        "transition",
        { attrs: { name: "menu", tag: "div" } },
        [
          _vm.$data.selected
            ? [
                _c("div", { staticClass: "side-menu" }, [
                  _c("p", { staticClass: "volume" }, [
                    _vm._v("VOL." + _vm._s(_vm.$data.selectedBook.volume))
                  ]),
                  _c("img", {
                    staticClass: "cover",
                    attrs: { src: _vm.$data.selectedBook.coverImage }
                  }),
                  _c("p", { staticClass: "title" }, [
                    _vm._v(_vm._s(_vm.$data.selectedBook.title))
                  ]),
                  _c("p", { staticClass: "price" }, [
                    _vm._v("￥" + _vm._s(_vm.$data.selectedBook.price))
                  ]),
                  _c("p", { staticClass: "date" }, [
                    _vm._v(_vm._s(_vm.$data.selectedBook.publishedAt))
                  ]),
                  _c("div", { staticClass: "description" }, [
                    _vm._v(_vm._s(_vm.$data.selectedBook.description))
                  ])
                ])
              ]
            : _vm._e()
        ],
        2
      )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-acb28178_0", { source: ".global-wrapper {\n  background: linear-gradient(-45deg, #ccc, #fff);\n  height: 100vh;\n  overflow: hidden;\n  position: relative;\n}\n.menu-enter-active,\n.menu-leave-active {\n  transition: all 0.45s cubic-bezier(0.15, 0.6, 0.52, 1);\n}\n.menu-enter, .menu-leave-to {\n  transform: translateX(100%);\n  opacity: 0;\n}\n.floor-wrapper {\n  width: 1000px;\n  perspective: 500px;\n}\n.floor-wrapper > .floor {\n  transform-style: preserve-3d;\n  transform: rotateX(35deg) rotateZ(-30deg) translateY(-50%);\n  width: 880px;\n  margin-left: 100px;\n}\n.book-list {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  margin-top: -80px;\n}\n.book-item {\n  width: 200px;\n  margin-bottom: 30px;\n  transform: translateZ(2px);\n  cursor: pointer;\n  transform-style: preserve-3d;\n  position: relative;\n}\n.book-item::before, .book-item::after {\n  content: \"\";\n  display: block;\n  position: absolute;\n}\n.book-item::before {\n  background-color: #777;\n  height: 100%;\n  width: 10px;\n  top: 0;\n  left: 0;\n  transform-origin: left;\n  transform: rotateY(90deg);\n}\n.book-item::after {\n  background: linear-gradient(to bottom, #fff, #dadada);\n  height: 10px;\n  width: 100%;\n  top: 100%;\n  transform-origin: top;\n  transform: rotateX(-90deg);\n}\n.book-item:hover > .cover {\n  animation: blink 0.5s linear alternate infinite;\n  box-shadow: 0 0 10px yellow;\n}\n.book-item > .cover {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: filter 0.2s;\n}\n.book-item > .back {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  transform: translateZ(-10px);\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n}\n@keyframes blink {\nfrom {\n    filter: brightness(1);\n}\nto {\n    filter: brightness(1.2);\n}\n}\n.side-menu {\n  width: 440px;\n  height: 100vh;\n  overflow-y: scroll;\n  background-color: rgba(255, 255, 255, 0.9);\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 20px 20px 80px 40px;\n  box-sizing: border-box;\n}\n.side-menu > .cover {\n  display: block;\n  width: 100%;\n  margin-bottom: 20px;\n}\n.side-menu > .volume {\n  font-family: \"Raleway\", sans-serif;\n  color: #888;\n  font-size: 14px;\n  margin-bottom: 14px;\n}\n.side-menu > .title {\n  font-size: 18px;\n  font-weight: bold;\n  margin-bottom: 20px;\n}\n.side-menu > .price {\n  font-family: \"Raleway\", sans-serif;\n  color: #888;\n  font-size: 16px;\n  margin-bottom: 12px;\n}\n.side-menu > .date {\n  font-family: \"Raleway\", sans-serif;\n  color: #888;\n  font-size: 16px;\n  margin-bottom: 20px;\n}\n.side-menu > .description {\n  line-height: 1.7;\n  font-size: 14px;\n}\n.menu-overlay {\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.4);\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n/*# sourceMappingURL=pen.vue.map */", map: {"version":3,"sources":["/tmp/codepen/vuejs/src/pen.vue","pen.vue"],"names":[],"mappings":"AA0DA;EACA,+CAAA;EACA,aAAA;EACA,gBAAA;EACA,kBAAA;ACzDA;AD4DA;;EAEA,sDAAA;ACzDA;AD2DA;EACA,2BAAA;EACA,UAAA;ACxDA;AD2DA;EACA,aAAA;EACA,kBAAA;ACxDA;AD0DA;EACA,4BAAA;EACA,0DAAA;EACA,YAAA;EACA,kBAAA;ACxDA;AD4DA;EACA,aAAA;EACA,eAAA;EACA,8BAAA;EACA,iBAAA;ACzDA;AD4DA;EACA,YAAA;EACA,mBAAA;EACA,0BAAA;EACA,eAAA;EACA,4BAAA;EACA,kBAAA;ACzDA;AD2DA;EAEA,WAAA;EACA,cAAA;EACA,kBAAA;AC1DA;AD6DA;EACA,sBAAA;EACA,YAAA;EACA,WAAA;EACA,MAAA;EACA,OAAA;EACA,sBAAA;EACA,yBAAA;AC3DA;AD8DA;EACA,qDAAA;EACA,YAAA;EACA,WAAA;EACA,SAAA;EACA,qBAAA;EACA,0BAAA;AC5DA;ADgEA;EACA,+CAAA;EACA,2BAAA;AC9DA;ADkEA;EACA,cAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,uBAAA;AChEA;ADmEA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,MAAA;EACA,OAAA;EACA,4BAAA;EACA,uCAAA;ACjEA;ADoEA;AACA;IACA,qBAAA;AClEE;ADqEF;IACA,uBAAA;ACnEE;AACF;ADuEA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,0CAAA;EACA,kBAAA;EACA,MAAA;EACA,QAAA;EACA,4BAAA;EACA,sBAAA;ACpEA;ADsEA;EACA,cAAA;EACA,WAAA;EACA,mBAAA;ACpEA;ADuEA;EACA,kCAAA;EACA,WAAA;EACA,eAAA;EACA,mBAAA;ACrEA;ADwEA;EACA,eAAA;EACA,iBAAA;EACA,mBAAA;ACtEA;ADyEA;EACA,kCAAA;EACA,WAAA;EACA,eAAA;EACA,mBAAA;ACvEA;AD0EA;EACA,kCAAA;EACA,WAAA;EACA,eAAA;EACA,mBAAA;ACxEA;AD2EA;EACA,gBAAA;EACA,eAAA;ACzEA;AD6EA;EACA,YAAA;EACA,aAAA;EACA,oCAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;AC1EA;;AAEA,kCAAkC","file":"pen.vue","sourcesContent":["<template lang=\"pug\">\n  .global-wrapper\n    .floor-wrapper\n      .floor\n        .book-list\n          template(v-for=\"book in $data.books\")\n            .book-item(@click=\"selectBook(book)\")\n              img(class=\"cover\" :src=\"book.coverImage\")\n              .back\n    template(v-if=\"$data.selected\")\n      .menu-overlay(@click=\"closeMenu\")\n    transition(name=\"menu\" tag=\"div\")\n      template(v-if=\"$data.selected\")\n        .side-menu\n          p(class=\"volume\") VOL.{{$data.selectedBook.volume}}\n          img(class=\"cover\" :src=\"$data.selectedBook.coverImage\")\n          p(class=\"title\") {{$data.selectedBook.title}}\n          p(class=\"price\") ￥{{$data.selectedBook.price}}\n          p(class=\"date\") {{$data.selectedBook.publishedAt}}\n          .description {{$data.selectedBook.description}}\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      books: [],\n      selected: false,\n      selectedBook: {\n        volume: null,\n        coverImage: null,\n        title: null,\n        publishedAt: null,\n        description: null,\n        price: null\n      }\n    };\n  },\n  mounted: function () {\n    axios\n      .get(\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/books.json\")\n      .then((res) => {\n        this.$data.books = res.data.books;\n      });\n  },\n  methods: {\n    selectBook(book) {\n      this.$data.selected = true;\n      this.$data.selectedBook = book;\n    },\n    closeMenu() {\n      this.$data.selected = false;\n    }\n  }\n};\n</script>\n\n<style lang=\"scss\">\n.global-wrapper {\n  background: linear-gradient(-45deg, #ccc, #fff);\n  height: 100vh;\n  overflow: hidden;\n  position: relative;\n}\n\n.menu-enter-active,\n.menu-leave-active {\n  transition: all 0.45s cubic-bezier(0.15, 0.6, 0.52, 1);\n}\n.menu-enter, .menu-leave-to /* .fade-leave-active below version 2.1.8 */ {\n  transform: translateX(100%);\n  opacity: 0;\n}\n\n.floor-wrapper {\n  width: 1000px;\n  perspective: 500px;\n\n  > .floor {\n    transform-style: preserve-3d;\n    transform: rotateX(35deg) rotateZ(-30deg) translateY(-50%);\n    width: 880px;\n    margin-left: 100px;\n  }\n}\n\n.book-list {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  margin-top: -80px;\n}\n\n.book-item {\n  width: 200px;\n  margin-bottom: 30px;\n  transform: translateZ(2px);\n  cursor: pointer;\n  transform-style: preserve-3d;\n  position: relative;\n\n  &::before,\n  &::after {\n    content: \"\";\n    display: block;\n    position: absolute;\n  }\n\n  &::before {\n    background-color: #777;\n    height: 100%;\n    width: 10px;\n    top: 0;\n    left: 0;\n    transform-origin: left;\n    transform: rotateY(90deg);\n  }\n\n  &::after {\n    background: linear-gradient(to bottom, #fff, #dadada);\n    height: 10px;\n    width: 100%;\n    top: 100%;\n    transform-origin: top;\n    transform: rotateX(-90deg);\n  }\n\n  &:hover {\n    > .cover {\n      animation: blink .5s linear alternate infinite;\n      box-shadow: 0 0 10px yellow;\n    }\n  }\n\n  > .cover {\n    display: block;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    transition: filter .2s;\n  }\n\n  > .back {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    transform: translateZ(-10px);\n    box-shadow: 0 0 10px rgba(black, 0.2);\n  }\n  \n  @keyframes blink {\n    from {\n      filter: brightness(1);\n    }\n    \n    to {\n      filter: brightness(1.2);\n    }\n  }\n}\n\n.side-menu {\n  width: 440px;\n  height: 100vh;\n  overflow-y: scroll;\n  background-color: rgba(white, 0.9);\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 20px 20px 80px 40px;\n  box-sizing: border-box;\n\n  > .cover {\n    display: block;\n    width: 100%;\n    margin-bottom: 20px;\n  }\n\n  > .volume {\n    font-family: \"Raleway\", sans-serif;\n    color: #888;\n    font-size: 14px;\n    margin-bottom: 14px;\n  }\n\n  > .title {\n    font-size: 18px;\n    font-weight: bold;\n    margin-bottom: 20px;\n  }\n\n  > .price {\n    font-family: \"Raleway\", sans-serif;\n    color: #888;\n    font-size: 16px;\n    margin-bottom: 12px;\n  }\n\n  > .date {\n    font-family: \"Raleway\", sans-serif;\n    color: #888;\n    font-size: 16px;\n    margin-bottom: 20px;\n  }\n\n  > .description {\n    line-height: 1.7;\n    font-size: 14px;\n  }\n}\n\n.menu-overlay {\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(black, 0.4);\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n</style>\n",".global-wrapper {\n  background: linear-gradient(-45deg, #ccc, #fff);\n  height: 100vh;\n  overflow: hidden;\n  position: relative;\n}\n\n.menu-enter-active,\n.menu-leave-active {\n  transition: all 0.45s cubic-bezier(0.15, 0.6, 0.52, 1);\n}\n\n.menu-enter, .menu-leave-to {\n  transform: translateX(100%);\n  opacity: 0;\n}\n\n.floor-wrapper {\n  width: 1000px;\n  perspective: 500px;\n}\n.floor-wrapper > .floor {\n  transform-style: preserve-3d;\n  transform: rotateX(35deg) rotateZ(-30deg) translateY(-50%);\n  width: 880px;\n  margin-left: 100px;\n}\n\n.book-list {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  margin-top: -80px;\n}\n\n.book-item {\n  width: 200px;\n  margin-bottom: 30px;\n  transform: translateZ(2px);\n  cursor: pointer;\n  transform-style: preserve-3d;\n  position: relative;\n}\n.book-item::before, .book-item::after {\n  content: \"\";\n  display: block;\n  position: absolute;\n}\n.book-item::before {\n  background-color: #777;\n  height: 100%;\n  width: 10px;\n  top: 0;\n  left: 0;\n  transform-origin: left;\n  transform: rotateY(90deg);\n}\n.book-item::after {\n  background: linear-gradient(to bottom, #fff, #dadada);\n  height: 10px;\n  width: 100%;\n  top: 100%;\n  transform-origin: top;\n  transform: rotateX(-90deg);\n}\n.book-item:hover > .cover {\n  animation: blink 0.5s linear alternate infinite;\n  box-shadow: 0 0 10px yellow;\n}\n.book-item > .cover {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: filter 0.2s;\n}\n.book-item > .back {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  transform: translateZ(-10px);\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n}\n@keyframes blink {\n  from {\n    filter: brightness(1);\n  }\n  to {\n    filter: brightness(1.2);\n  }\n}\n\n.side-menu {\n  width: 440px;\n  height: 100vh;\n  overflow-y: scroll;\n  background-color: rgba(255, 255, 255, 0.9);\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 20px 20px 80px 40px;\n  box-sizing: border-box;\n}\n.side-menu > .cover {\n  display: block;\n  width: 100%;\n  margin-bottom: 20px;\n}\n.side-menu > .volume {\n  font-family: \"Raleway\", sans-serif;\n  color: #888;\n  font-size: 14px;\n  margin-bottom: 14px;\n}\n.side-menu > .title {\n  font-size: 18px;\n  font-weight: bold;\n  margin-bottom: 20px;\n}\n.side-menu > .price {\n  font-family: \"Raleway\", sans-serif;\n  color: #888;\n  font-size: 16px;\n  margin-bottom: 12px;\n}\n.side-menu > .date {\n  font-family: \"Raleway\", sans-serif;\n  color: #888;\n  font-size: 16px;\n  margin-bottom: 20px;\n}\n.side-menu > .description {\n  line-height: 1.7;\n  font-size: 14px;\n}\n\n.menu-overlay {\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.4);\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n/*# sourceMappingURL=pen.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;