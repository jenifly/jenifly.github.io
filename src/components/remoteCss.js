export default {
  render(h) {
    return h('link', { attrs: { rel: 'stylesheet', href: this.href }})
  },
  props: {
    href: { type: String, required: true },
  }
}