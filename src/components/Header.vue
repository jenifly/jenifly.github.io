<template>
  <div class="header">
    <h2>Jenifly's GitHub Pages</h2>
    <svg tabindex="66" viewBox="0 0 20 20">
      <rect y="9" width="20" height="2"></rect>
      <rect y="3" width="20" height="2"></rect>
      <rect y="15" width="20" height="2"></rect>
    </svg>
    <div class="nav">
      <h4 v-for="i in t" @click="click(i)" :class="$route.name==i?'active':''">{{i}}</h4>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {t: ['home', 'yiyan', 'notebook', 'editor']}
  },
  methods: {
    click (a) {
      if(this.$route.name == a) return
      this.$router.push({name: a})
    }
  }
}
</script>
