<template>
  <div class="notebook">
    <div class="tb" :class="r?'tb-a':''">
      <svg class="active" viewBox="0 0 1024 1024" v-html='svg.ku'/>
      <svg viewBox="0 0 1024 1024" v-html='svg.catalogue'/>
    </div>
    <aside ref="aside" class="notebook" :class="r?'aside-a':''">
      <svg v-if="r==1" class="left" viewBox="0 0 1024 1024" v-html="svg.r" @click="r=0"></svg>
      <ul style="padding-top:1em">
        <li v-for="(i, j) in notes" :key="j">
          <div class="item" @click.self="click(i, j, $event)">
            <svg viewBox="0 0 1024 1024" v-html="svg[i.type+(i.o?1:'')]"></svg>
            {{i.name.split('.')[0]}}
          </div>
        <ul v-if="i.o">
          <li v-for="(x, y) in i.child" :key="y">
            <div class="item" @click.self="click(x, y, $event)">
              <svg viewBox="0 0 1024 1024" v-html="svg[x.type+(x.o?1:'')]"></svg>
              {{x.name.split('.')[0]}}
            </div>
          </li>
        </ul>
        </li>
      </ul>
    </aside>
    <div class="touch" @mousedown="mousedown"></div>
    <section>
      <svg v-if="r==0" class="right" viewBox="0 0 1024 1024" v-html="svg.r" @click="r=1"></svg>
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
      svg: {dir: '<path d="M363.9 156l87.4 98.2 11.9 13.4H920V868H104V156h259.9m17.9-40H64v792h896V227.6H481.1L381.8 116zM960 341.7H64v40h896v-40z" fill="" p-id="1799"></path>', dir1: '<path d="M910.222 398.222V284.444h-455.11L341.332 170.667H56.89v739.555h853.333l102.4-455.11 11.378-56.89H910.222z m-45.51 455.111H113.777V227.556h204.8l113.778 113.777h420.977v56.89H284.444L170.667 568.888h73.955l79.645-113.778h625.777l-85.333 398.222z"></path>', file: '<path d="M870.4 358.4h-204.8a102.4 102.4 0 0 1-102.4-102.4V51.2H204.8a51.2 51.2 0 0 0-51.2 51.2v819.2a51.2 51.2 0 0 0 51.2 51.2h614.4a51.2 51.2 0 0 0 51.2-51.2V358.4z m-21.1968-51.2L614.4 72.3968V256a51.2 51.2 0 0 0 51.2 51.2h183.6032z m-277.1968-307.2a102.4 102.4 0 0 1 72.3968 30.0032l247.1936 247.1936A102.4 102.4 0 0 1 921.6 349.5936V921.6a102.4 102.4 0 0 1-102.4 102.4H204.8a102.4 102.4 0 0 1-102.4-102.4V102.4a102.4 102.4 0 0 1 102.4-102.4h367.2064z"></path><path d="M284.444 682.667h455.112v56.889H284.444z m0-170.667h455.112v56.889H284.444z"></path>', ku: '<path d="M619.102041 475.428571h-214.204082c-45.97551 0-83.591837-37.616327-83.591837-83.591836V177.632653c0-45.97551 37.616327-83.591837 83.591837-83.591837h214.204082c45.97551 0 83.591837 37.616327 83.591837 83.591837v214.204082c0 45.97551-37.616327 83.591837-83.591837 83.591836z m-214.204082-339.591836c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918V177.632653c0-22.987755-18.808163-41.795918-41.795918-41.795918h-214.204082z"></path><path d="M391.836735 929.959184H177.632653c-45.97551 0-83.591837-37.616327-83.591837-83.591837v-214.204082c0-45.97551 37.616327-83.591837 83.591837-83.591836h214.204082c45.97551 0 83.591837 37.616327 83.591836 83.591836v214.204082c0 45.97551-37.616327 83.591837-83.591836 83.591837z m-214.204082-339.591837c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918v-214.204082c0-22.987755-18.808163-41.795918-41.795918-41.795918H177.632653z"></path><path d="M846.367347 929.959184h-214.204082c-45.97551 0-83.591837-37.616327-83.591836-83.591837v-214.204082c0-45.97551 37.616327-83.591837 83.591836-83.591836h214.204082c45.97551 0 83.591837 37.616327 83.591837 83.591836v214.204082c0 45.97551-37.616327 83.591837-83.591837 83.591837z m-214.204082-339.591837c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918v-214.204082c0-22.987755-18.808163-41.795918-41.795918-41.795918h-214.204082z"></path>', catalogue: '<path d="M384.088 191.941h512.023v63.893H384.088zM384.08 448.224h512.091v63.905H384.08zM384.078 703.887h512.099v63.874H384.078zM127.883 191.802H256.05v64.034H127.883zM128.065 448.243h127.917v63.768H128.065zM128.103 703.851h127.95v63.926h-127.95z"></path>', r: '<path d="M401.92 263.68c-10.24-10.24-25.6-10.24-35.84 0-10.24 10.24-10.24 25.6 0 35.84l212.48 212.48-212.48 212.48c-10.24 10.24-10.24 25.6 0 35.84 10.24 10.24 25.6 10.24 35.84 0l230.4-227.84c5.12-5.12 7.68-12.8 7.68-20.48 0-7.68-2.56-15.36-7.68-20.48l-230.4-227.84zM819.2 102.4H204.8C148.48 102.4 102.4 148.48 102.4 204.8v614.4c0 56.32 46.08 102.4 102.4 102.4h614.4c56.32 0 102.4-46.08 102.4-102.4V204.8c0-56.32-46.08-102.4-102.4-102.4z m51.2 716.8c0 28.16-23.04 51.2-51.2 51.2H204.8c-28.16 0-51.2-23.04-51.2-51.2V204.8c0-28.16 23.04-51.2 51.2-51.2h614.4c28.16 0 51.2 23.04 51.2 51.2v614.4z"></path>'}, notes: [
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
], title: '', content: '', init: false, r: 0
      }
  },
  created () {
    // this.getList()
    this.load()
  },
  watch: {
    $route () {
      this.load()
    }
  },
  methods: {
    load () {
      this.content = ''
      let a = this.$route.query.i
      if(a) {
        const b = decodeURIComponent(a).split('/')
        this.title = document.title = b[b.length-1]
        this.doGet('https://raw.githubusercontent.com/jenifly/jenifly.github.io/master/' + a + '.md', res => {
          this.initMarked()
          this.init = true
          this.content = marked(res)
        })
      }
    },
    mousedown (e) {
      let disX = e.clientX
      let w = this.$refs.aside.clientWidth
      this.$refs.aside.style.transitionDuration = '0s'
      document.body.style.userSelect = 'none'
      document.onmousemove = (e) => {
        this.$refs.aside.style.width = Math.max(w + e.clientX - disX, 200) + 'px'
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
        document.body.style.userSelect = 'auto'
        this.$refs.aside.style.transitionDuration = '.2s'
      }
    },
    getList (s) {
      this.doGet(this.baseUrl + (s?s.path:'notes'), res => {
        if(s)
          this.$set(s, 'child', res)
        else
          this.notes = res
      })
    },
    initMarked () {
      let rendererMD = new marked.Renderer()
      rendererMD.heading = function(text, level, raw) {
        console.log(text, level, raw)
        
        // var anchor = tocObj.add(text, level)
        // return `<h${level} id=${anchor}>${text}</h${level}>\n`
      }
      marked.setOptions({
        renderer: rendererMD,
        gfm: true,
        tables: true,
        escaped : true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: (code, lang) => { 
          if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code, true).value
          } else {
            return hljs.highlightAuto(code).value
          }
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
