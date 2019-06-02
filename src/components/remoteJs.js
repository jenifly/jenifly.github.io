export default {
  render(h) {
    return h('script', { attrs: { type: 'text/javascript', src: this.src }})
  },
  props: {
    src: { type: String, required: true },
  }
}