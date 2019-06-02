<template>
  <div class="notebook">
    <aside class="notebook">
      <h2>目录</h2>
      <ul class="base">
        <li v-for="(i, j) in notes" :key="j" @click="click(i)"><svg viewBox="0 0 1024 1024" v-html="svg[i.type]"></svg>{{i.name.split('.')[0]}}</li>
      </ul>
    </aside>
    <router-view/>
    <!-- <remoteJs src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"/> -->
    <!-- <remoteJs src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js"/>
    <remoteCss href="https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css"/> -->
    <!-- <remoteCss href="https://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css"/> -->
    <!-- <remoteCss href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/default.min.css"/> -->
    <!-- <remoteJs src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"/> -->
  </div>
</template>
<script>
import '../assets/notebook.scss'
// import remoteJs from "../components/remoteJs"
// import remoteCss from "../components/remoteCss"
export default {
  // components: {remoteJs, remoteCss},
  data () {
    return {
      svg: {dir: '<path d="M363.9 156l87.4 98.2 11.9 13.4H920V868H104V156h259.9m17.9-40H64v792h896V227.6H481.1L381.8 116zM960 341.7H64v40h896v-40z" fill="" p-id="1799"></path>', dir1: '<path d="M910.222 398.222V284.444h-455.11L341.332 170.667H56.89v739.555h853.333l102.4-455.11 11.378-56.89H910.222z m-45.51 455.111H113.777V227.556h204.8l113.778 113.777h420.977v56.89H284.444L170.667 568.888h73.955l79.645-113.778h625.777l-85.333 398.222z"></path>', file: '<path d="M870.4 358.4h-204.8a102.4 102.4 0 0 1-102.4-102.4V51.2H204.8a51.2 51.2 0 0 0-51.2 51.2v819.2a51.2 51.2 0 0 0 51.2 51.2h614.4a51.2 51.2 0 0 0 51.2-51.2V358.4z m-21.1968-51.2L614.4 72.3968V256a51.2 51.2 0 0 0 51.2 51.2h183.6032z m-277.1968-307.2a102.4 102.4 0 0 1 72.3968 30.0032l247.1936 247.1936A102.4 102.4 0 0 1 921.6 349.5936V921.6a102.4 102.4 0 0 1-102.4 102.4H204.8a102.4 102.4 0 0 1-102.4-102.4V102.4a102.4 102.4 0 0 1 102.4-102.4h367.2064z"></path><path d="M284.444 682.667h455.112v56.889H284.444z m0-170.667h455.112v56.889H284.444z"></path>'}, notes: [
{
"name": "python",
"path": "notes/python",
"sha": "2a739ca793a31fe7fd342d9ac2265a3533debeb4",
"size": 0,
"url": "https://api.github.com/repos/jenifly/jenifly.github.io/contents/notes/python?ref=master",
"html_url": "https://github.com/jenifly/jenifly.github.io/tree/master/notes/python",
"git_url": "https://api.github.com/repos/jenifly/jenifly.github.io/git/trees/2a739ca793a31fe7fd342d9ac2265a3533debeb4",
"download_url": null,
"type": "dir",
"_links": {
"self": "https://api.github.com/repos/jenifly/jenifly.github.io/contents/notes/python?ref=master",
"git": "https://api.github.com/repos/jenifly/jenifly.github.io/git/trees/2a739ca793a31fe7fd342d9ac2265a3533debeb4",
"html": "https://github.com/jenifly/jenifly.github.io/tree/master/notes/python"
}
},
{
"name": "生成器和迭代器.md",
"path": "notes/生成器和迭代器.md",
"sha": "e549e42806fcdefee41aca3bdc83515ff9785556",
"size": 6110,
"url": "https://api.github.com/repos/jenifly/jenifly.github.io/contents/notes/生成器和迭代器.md?ref=master",
"html_url": "https://github.com/jenifly/jenifly.github.io/blob/master/notes/生成器和迭代器.md",
"git_url": "https://api.github.com/repos/jenifly/jenifly.github.io/git/blobs/e549e42806fcdefee41aca3bdc83515ff9785556",
"download_url": "https://raw.githubusercontent.com/jenifly/jenifly.github.io/master/notes/生成器和迭代器.md",
"type": "file",
"_links": {
"self": "https://api.github.com/repos/jenifly/jenifly.github.io/contents/notes/生成器和迭代器.md?ref=master",
"git": "https://api.github.com/repos/jenifly/jenifly.github.io/git/blobs/e549e42806fcdefee41aca3bdc83515ff9785556",
"html": "https://github.com/jenifly/jenifly.github.io/blob/master/notes/生成器和迭代器.md"
}
}
], title: '', text: ''
      }
  },
  created () {
    //this.getList()
  },
  methods: {
    getList (s) {
      this.doGet(this.baseUrl + (s?s.name:'notes'), res => {
        s?s.child:this.notes = res
      })
    },
    click (e) {
      // marked.setOptions({
      //   renderer: new marked.Renderer(),
      //   gfm: true,
      //   tables: true,
      //   breaks: false,
      //   pedantic: false,
      //   sanitize: false,
      //   smartLists: true,
      //   smartypants: false,
      //   highlight: function (code) { 
      //     return hljs.highlightAuto(code).value
      //   }})
      // hljs.initHighlightingOnLoad()
      if(e.download_url) {
        this.title = e.name.split('.')[0]
        this.$router.push({path: '/notebook/article', query: {i: encodeURIComponent(this.title)}})
      }
    }
  }
}
</script>
