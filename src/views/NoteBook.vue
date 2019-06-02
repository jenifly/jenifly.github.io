<template>
  <div class="notebook">
    <div class="tb">
      <svg class="active" viewBox="0 0 1024 1024" v-html='svg.ku'/>
      <svg viewBox="0 0 1024 1024" v-html='svg.catalogue'/>
    </div>
    <aside class="notebook">
      <ul style="padding-top:1em">
        <li v-for="(i, j) in notes" :key="j" @click.self="click(i, j, $event)"><svg viewBox="0 0 1024 1024" v-html="svg[i.type+(i.o?1:'')]"></svg>{{i.name.split('.')[0]}}
        <ul v-if="i.o">
          <li v-for="(x, y) in i.child" :key="y" @click.self="click(x, y, $event)"><svg viewBox="0 0 1024 1024" v-html="svg[x.type+(x.o?1:'')]"></svg>{{x.name.split('.')[0]}}</li>
        </ul>
        </li>
      </ul>
    </aside>
    <div class="touch"></div>
    <section>
      <div v-if="!content">加载中...</div>
      <h1 v-if="content" class="title">{{title}}</h1>
      <article v-if="content" class="markdown-body" v-html="content"/>
    </section>
  </div>
</template>
<script>
import '../assets/notebook.scss'
export default {
  data () {
    return {
      svg: {dir: '<path d="M363.9 156l87.4 98.2 11.9 13.4H920V868H104V156h259.9m17.9-40H64v792h896V227.6H481.1L381.8 116zM960 341.7H64v40h896v-40z" fill="" p-id="1799"></path>', dir1: '<path d="M910.222 398.222V284.444h-455.11L341.332 170.667H56.89v739.555h853.333l102.4-455.11 11.378-56.89H910.222z m-45.51 455.111H113.777V227.556h204.8l113.778 113.777h420.977v56.89H284.444L170.667 568.888h73.955l79.645-113.778h625.777l-85.333 398.222z"></path>', file: '<path d="M870.4 358.4h-204.8a102.4 102.4 0 0 1-102.4-102.4V51.2H204.8a51.2 51.2 0 0 0-51.2 51.2v819.2a51.2 51.2 0 0 0 51.2 51.2h614.4a51.2 51.2 0 0 0 51.2-51.2V358.4z m-21.1968-51.2L614.4 72.3968V256a51.2 51.2 0 0 0 51.2 51.2h183.6032z m-277.1968-307.2a102.4 102.4 0 0 1 72.3968 30.0032l247.1936 247.1936A102.4 102.4 0 0 1 921.6 349.5936V921.6a102.4 102.4 0 0 1-102.4 102.4H204.8a102.4 102.4 0 0 1-102.4-102.4V102.4a102.4 102.4 0 0 1 102.4-102.4h367.2064z"></path><path d="M284.444 682.667h455.112v56.889H284.444z m0-170.667h455.112v56.889H284.444z"></path>', ku: '<path d="M619.102041 475.428571h-214.204082c-45.97551 0-83.591837-37.616327-83.591837-83.591836V177.632653c0-45.97551 37.616327-83.591837 83.591837-83.591837h214.204082c45.97551 0 83.591837 37.616327 83.591837 83.591837v214.204082c0 45.97551-37.616327 83.591837-83.591837 83.591836z m-214.204082-339.591836c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918V177.632653c0-22.987755-18.808163-41.795918-41.795918-41.795918h-214.204082z"></path><path d="M391.836735 929.959184H177.632653c-45.97551 0-83.591837-37.616327-83.591837-83.591837v-214.204082c0-45.97551 37.616327-83.591837 83.591837-83.591836h214.204082c45.97551 0 83.591837 37.616327 83.591836 83.591836v214.204082c0 45.97551-37.616327 83.591837-83.591836 83.591837z m-214.204082-339.591837c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918v-214.204082c0-22.987755-18.808163-41.795918-41.795918-41.795918H177.632653z"></path><path d="M846.367347 929.959184h-214.204082c-45.97551 0-83.591837-37.616327-83.591836-83.591837v-214.204082c0-45.97551 37.616327-83.591837 83.591836-83.591836h214.204082c45.97551 0 83.591837 37.616327 83.591837 83.591836v214.204082c0 45.97551-37.616327 83.591837-83.591837 83.591837z m-214.204082-339.591837c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918v-214.204082c0-22.987755-18.808163-41.795918-41.795918-41.795918h-214.204082z"></path>', catalogue: '<path d="M384.088 191.941h512.023v63.893H384.088zM384.08 448.224h512.091v63.905H384.08zM384.078 703.887h512.099v63.874H384.078zM127.883 191.802H256.05v64.034H127.883zM128.065 448.243h127.917v63.768H128.065zM128.103 703.851h127.95v63.926h-127.95z"></path>'}, notes: [
{
"name": "python",
"child": [{"name":"生成器和迭代器.md","path":"notes/python/生成器和迭代器.md","sha":"e549e42806fcdefee41aca3bdc83515ff9785556","size":6110,"url":"https://api.github.com/repos/jenifly/jenifly.github.io/contents/notes/python/%E7%94%9F%E6%88%90%E5%99%A8%E5%92%8C%E8%BF%AD%E4%BB%A3%E5%99%A8.md?ref=master","html_url":"https://github.com/jenifly/jenifly.github.io/blob/master/notes/python/%E7%94%9F%E6%88%90%E5%99%A8%E5%92%8C%E8%BF%AD%E4%BB%A3%E5%99%A8.md","git_url":"https://api.github.com/repos/jenifly/jenifly.github.io/git/blobs/e549e42806fcdefee41aca3bdc83515ff9785556","download_url":"https://raw.githubusercontent.com/jenifly/jenifly.github.io/master/notes/python/%E7%94%9F%E6%88%90%E5%99%A8%E5%92%8C%E8%BF%AD%E4%BB%A3%E5%99%A8.md","type":"file","_links":{"self":"https://api.github.com/repos/jenifly/jenifly.github.io/contents/notes/python/%E7%94%9F%E6%88%90%E5%99%A8%E5%92%8C%E8%BF%AD%E4%BB%A3%E5%99%A8.md?ref=master","git":"https://api.github.com/repos/jenifly/jenifly.github.io/git/blobs/e549e42806fcdefee41aca3bdc83515ff9785556","html":"https://github.com/jenifly/jenifly.github.io/blob/master/notes/python/%E7%94%9F%E6%88%90%E5%99%A8%E5%92%8C%E8%BF%AD%E4%BB%A3%E5%99%A8.md"}}],
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
},
{
"name": "我说法水电费刚发的.md",
"path": "notes/我说法水电费刚发的.md",
"sha": "e549e42806fcdefee41aca3bdc83515ff9785556",
"size": 6110,
"url": "https://api.github.com/repos/jenifly/jenifly.github.io/contents/notes/我说法水电费刚发的.md?ref=master",
"html_url": "https://github.com/jenifly/jenifly.github.io/blob/master/notes/我说法水电费刚发的.md",
"git_url": "https://api.github.com/repos/jenifly/jenifly.github.io/git/blobs/e549e42806fcdefee41aca3bdc83515ff9785556",
"download_url": "https://raw.githubusercontent.com/jenifly/jenifly.github.io/master/notes/我说法水电费刚发的.md",
"type": "file",
"_links": {
"self": "https://api.github.com/repos/jenifly/jenifly.github.io/contents/notes/我说法水电费刚发的.md?ref=master",
"git": "https://api.github.com/repos/jenifly/jenifly.github.io/git/blobs/e549e42806fcdefee41aca3bdc83515ff9785556",
"html": "https://github.com/jenifly/jenifly.github.io/blob/master/notes/我说法水电费刚发的.md"
}
}
], title: '', content: '', init: false
      }
  },
  created () {
    this.getList()
    let a = this.$route.query.i
    this.$nextTick(()=>{
      if(a) {
        const b = decodeURIComponent(a).split('/')
        this.title = document.title = b[b.length-1]
        this.doGet('https://raw.githubusercontent.com/jenifly/jenifly.github.io/master/' + a + '.md', res => {
          this.initMarked()
          this.init = true
          this.content = marked(res)
        })
      }
    })
  },
  methods: {
    getList (s) {
      this.doGet(this.baseUrl + (s?s.path:'notes'), res => {
        if(s)
          this.$set(s, 'child', res)
        else
          this.notes = res
      })
    },
    initMarked () {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) { 
          return hljs.highlightAuto(code).value
        }
      })
    },
    click (i, j, k) {
      if(i.download_url) {
        this.content = ''
        this.title = document.title = i.name.split('.')[0]
        this.$nextTick(() => {
          this.doGet(i.download_url, res => {
            if(!this.init) this.initMarked()
            this.content = marked(res)
          })
        })
        let a = i.path.split('/')
        this.$router.push({path: '/notebook', query: {i: encodeURIComponent(i.path.split('.')[0])}})
      }else {
        this.$set(i, 'o', !i.o)
        if(!i.child) this.getList(i)
      }
    }
  }
}
</script>
