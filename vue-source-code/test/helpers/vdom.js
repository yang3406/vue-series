import VNode from 'core/vdom/vnode'

window.createTextVNode = function (textr) {
  return new VNode(undefined, undefined, undefined, textr)
}
