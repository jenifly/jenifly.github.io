<template>
  <section>
    <h1 class="title">{{title}}</h1>
    <article class="markdown-body" v-html="content">
    </article>
    <!-- <remoteJs src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"/> -->
      <remoteJs src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js"/>
      <remoteCss href="https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css"/>
      <!-- <remoteCss href="https://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css"/> -->
      <!-- <remoteCss href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/default.min.css"/> -->
      <remoteJs ref="marked" src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"/>
  </section>
</template>
<script>
import remoteJs from "../components/remoteJs"
import remoteCss from "../components/remoteCss"
export default {
  data () {return {title: '', content: ''}},
  components: {remoteJs, remoteCss},
  created () {
    console.log('bbbbbbbbbbbbbb');

    this.title = document.title = decodeURIComponent(this.$route.query.i)
    if(!this.$route.query.i) return this.$router.go(-1)
    this.$nextTick(() => {      
      this.doGet('https://raw.githubusercontent.com/jenifly/jenifly.github.io/master/notes/' + this.title + '.md', res => this.content = marked(res))
    })
  },
  activated () {
    console.log('aaaaaaaaaaaaaa');
    
    this.title = document.title = decodeURIComponent(this.$route.query.i)
    if(!this.$route.query.i) return this.$router.go(-1)
    this.$nextTick(() => {      
      this.doGet('https://raw.githubusercontent.com/jenifly/jenifly.github.io/master/notes/' + this.title + '.md', res => this.content = marked(res))
    })
  }
}
</script>