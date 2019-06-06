<template>
  <div class="notebook">
    <div class="tb" :class="r?'tb-a':''">
      <svg v-for="(i,j) in tbs" :class="tb==j?'active':''" viewBox="0 0 1024 1024" @click="tb=j;cookie.set('tb',j,1)" v-html='svg[i]'/>
    </div>
    <aside ref="aside" :class="['scroll',r?'aside-a':'']">
      <svg v-show="r==1&&!loading" class="left" viewBox="0 0 1024 1024" v-html="svg.r" @click="r=0"></svg>
      <ul style="padding-top:1em" v-show="tb==0">
        <li v-for="(i, j) in notes" :key="j" @click.self="click(i, $event.target)"><svg viewBox="0 0 1024 1024" v-html="svg[i.type]"></svg>{{i.name.split('.')[0]}}
        </li>
      </ul>
      <ul ref="catalogue" class="ctlg" v-show="tb==1">
        <p v-if="!$route.query.i" style="text-align:center;margin-right:1.2em">请先打开一个文件吧</p>
      </ul>
    </aside>
    <div class="touch" :class="loading?'loading':''" @mousedown="mousedown"></div>
    <section ref="sct" :class="[loading?'loading':'', 'scroll']">
      <svg v-show="r==0&&!loading" class="right" viewBox="0 0 1024 1024" v-html="svg.r" @click="r=1"></svg>
      <h3 class="ph" v-if="!content&&!loading">这是布置在GitHub Pages上的静态Vue项目，路由可能会存在某些问题<br>欢迎在 <a href="https://github.com/jenifly/jenifly.github.io" target="_blank">https://github.com/jenifly/jenifly.github.io</a> 提交issues</h3>
      <div class="yiyan" v-if="!content&&!loading">
        <div class="item" v-if="j<Math.max(1, yi)" v-for="(i,j) in yiyan">
          <img :src="i.src">
          <div :class="'jy'+i.class" v-html="i.content"></div>
          <span>- {{i.title}} -</span>
        </div>
      </div>
      <div v-if="loading" class="yiyan">
        <div class="item" style="width:12em;height:auto">
          <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>
          <span>加载中...</span>
        </div>
      </div>
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
      svg: {
        dir: '<path d="M363.9 156l87.4 98.2 11.9 13.4H920V868H104V156h259.9m17.9-40H64v792h896V227.6H481.1L381.8 116zM960 341.7H64v40h896v-40z" fill="" p-id="1799"></path>', 
        dir1: '<path d="M910.222 398.222V284.444h-455.11L341.332 170.667H56.89v739.555h853.333l102.4-455.11 11.378-56.89H910.222z m-45.51 455.111H113.777V227.556h204.8l113.778 113.777h420.977v56.89H284.444L170.667 568.888h73.955l79.645-113.778h625.777l-85.333 398.222z"></path>', 
        file: '<path d="M870.4 358.4h-204.8a102.4 102.4 0 0 1-102.4-102.4V51.2H204.8a51.2 51.2 0 0 0-51.2 51.2v819.2a51.2 51.2 0 0 0 51.2 51.2h614.4a51.2 51.2 0 0 0 51.2-51.2V358.4z m-21.1968-51.2L614.4 72.3968V256a51.2 51.2 0 0 0 51.2 51.2h183.6032z m-277.1968-307.2a102.4 102.4 0 0 1 72.3968 30.0032l247.1936 247.1936A102.4 102.4 0 0 1 921.6 349.5936V921.6a102.4 102.4 0 0 1-102.4 102.4H204.8a102.4 102.4 0 0 1-102.4-102.4V102.4a102.4 102.4 0 0 1 102.4-102.4h367.2064z"></path><path d="M284.444 682.667h455.112v56.889H284.444z m0-170.667h455.112v56.889H284.444z"></path>', 
        ku: '<path d="M619.102041 475.428571h-214.204082c-45.97551 0-83.591837-37.616327-83.591837-83.591836V177.632653c0-45.97551 37.616327-83.591837 83.591837-83.591837h214.204082c45.97551 0 83.591837 37.616327 83.591837 83.591837v214.204082c0 45.97551-37.616327 83.591837-83.591837 83.591836z m-214.204082-339.591836c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918V177.632653c0-22.987755-18.808163-41.795918-41.795918-41.795918h-214.204082z"></path><path d="M391.836735 929.959184H177.632653c-45.97551 0-83.591837-37.616327-83.591837-83.591837v-214.204082c0-45.97551 37.616327-83.591837 83.591837-83.591836h214.204082c45.97551 0 83.591837 37.616327 83.591836 83.591836v214.204082c0 45.97551-37.616327 83.591837-83.591836 83.591837z m-214.204082-339.591837c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918v-214.204082c0-22.987755-18.808163-41.795918-41.795918-41.795918H177.632653z"></path><path d="M846.367347 929.959184h-214.204082c-45.97551 0-83.591837-37.616327-83.591836-83.591837v-214.204082c0-45.97551 37.616327-83.591837 83.591836-83.591836h214.204082c45.97551 0 83.591837 37.616327 83.591837 83.591836v214.204082c0 45.97551-37.616327 83.591837-83.591837 83.591837z m-214.204082-339.591837c-22.987755 0-41.795918 18.808163-41.795918 41.795918v214.204082c0 22.987755 18.808163 41.795918 41.795918 41.795918h214.204082c22.987755 0 41.795918-18.808163 41.795918-41.795918v-214.204082c0-22.987755-18.808163-41.795918-41.795918-41.795918h-214.204082z"></path>', 
        catalogue: '<path d="M384.088 191.941h512.023v63.893H384.088zM384.08 448.224h512.091v63.905H384.08zM384.078 703.887h512.099v63.874H384.078zM127.883 191.802H256.05v64.034H127.883zM128.065 448.243h127.917v63.768H128.065zM128.103 703.851h127.95v63.926h-127.95z"></path>', 
        r: '<path d="M401.92 263.68c-10.24-10.24-25.6-10.24-35.84 0-10.24 10.24-10.24 25.6 0 35.84l212.48 212.48-212.48 212.48c-10.24 10.24-10.24 25.6 0 35.84 10.24 10.24 25.6 10.24 35.84 0l230.4-227.84c5.12-5.12 7.68-12.8 7.68-20.48 0-7.68-2.56-15.36-7.68-20.48l-230.4-227.84zM819.2 102.4H204.8C148.48 102.4 102.4 148.48 102.4 204.8v614.4c0 56.32 46.08 102.4 102.4 102.4h614.4c56.32 0 102.4-46.08 102.4-102.4V204.8c0-56.32-46.08-102.4-102.4-102.4z m51.2 716.8c0 28.16-23.04 51.2-51.2 51.2H204.8c-28.16 0-51.2-23.04-51.2-51.2V204.8c0-28.16 23.04-51.2 51.2-51.2h614.4c28.16 0 51.2 23.04 51.2 51.2v614.4z"></path>',
        cr: '<path d="M407.808 257.28l-46.336 46.336L569.907 512 361.472 720.384l46.336 46.336 208.384-208.384L662.528 512l-46.336-46.336z"></path>'
      }, notes: [], title: '', content: '', init: false, r: 0, k: 1, yiyan: [], loading: false, cacheLi: undefined, tbs: ['ku', 'catalogue' ], tb: 0, yi: 3, t: 0, gs: [], ac: [], cac: '#a0', s: 0
    }
  },
  created () {
    this.doGet('https://raw.githubusercontent.com/jenifly/jenifly.github.io/master/res/yiyan/0.josn', res => this.yiyan = res)
    if(this.cookie.get('u')) this.$router.push({path: '/notebook', query: {i: this.cookie.get('u')}})
    this.$nextTick(() => {
      this.load(this.$route.query.i)
      this.yi = Math.floor(this.$refs.sct.clientWidth / 440)
      this.$refs.sct.addEventListener('scroll', (e) => {
        let c = e.target.scrollTop
        this.cookie.set('t', c, 1)
        if(this.ac.length) {
          let b = this.ac[this.ac.length - 1][0]
          for(let a of this.ac){
            if(a[1] >= c-95){
              b = a[0]
              break
            }
          }
          if(b!=this.cac){
            this.$el.querySelector(this.cac).classList.remove('active')
            this.$el.querySelector(b).classList.add('active')
            this.cac = b
          }
        }
      })
      this.$refs.aside.addEventListener('scroll', (e) => this.cookie.set('a', e.target.scrollLeft + '-' + e.target.scrollTop, 1))
      this.getList()
    })
  },
  mounted() {
    window.onresize = () => (()=> {
      if(!this.content)this.yi = Math.floor(this.$refs.sct.clientWidth / 440)
    })()
  },
  watch: {
    $route (v) { // 监听路由传参（利用url保存数据，防刷新丢失、实现浏览器后退前进）
      this.content = ''
      this.load(v.query.i)
    }
  },
  methods: {
    catalogue () {
      this.$nextTick(() => {
      let a = 0
      let b = this.$refs.catalogue
      this.$refs.catalogue.innerHTML = ''
      this.ac = []
      this.cac = '#a0'
      while (this.gs.length > 0) {
        let c = this.gs.shift() // 目录，出队
        b = a&&c[1]>a?this.addUl(b):this.getp(b,a-c[1])
        let d = document.createElement('li')
        d.innerText = c[0]
        d.setAttribute('id', 'a'+c[2])
        if(c[2]==0) d.classList.add('active')
        let e = this.$el.querySelector('#t'+c[2]).offsetTop - 95
        this.ac.push(['#a'+c[2], e])
        d.onclick = (g) => {
          if(this.cac == '#a'+c[2]) return
          g.stopPropagation() // 阻止冒泡
          this.$refs.sct.scrollTop = e
          this.$el.querySelector(this.cac).classList.remove('active')
          g.target.classList.add('active')
          this.cac = '#a'+c[2]
        }
        b.appendChild(d)
        a = c[1]
      }})
    },
    addUl (a) {
      let b = document.createElement('ul')
      a.lastChild.innerHTML = `<svg viewBox="0 0 1024 1024" style="transform:rotate(90deg)">${this.svg.cr}</svg>` + a.lastChild.innerHTML
      let c = a.lastChild.firstChild
      c.onclick = (e) => {
        e.stopPropagation() // 阻止冒泡
        c.style.transform =c.style.transform?'':'rotate(90deg)'
        let a = c.parentNode.nextSibling
        a.style.display = a.style.display?'':'none'
      }
      a.appendChild(b)
      return b
    },
    getp (a, b) {
      for (let i = 0; i < b; i++) {
        if(a == this.$refs.catalogue) return a
        a = a.parentNode
      }
      return a
    },
    load (a) {
      if(!a) return
      this.tb = Number(this.cookie.get('tb') || 0)
      this.loading = true
      const b = decodeURIComponent(a).split('/')
      this.title = document.title = b[b.length-1]
      this.doGet('https://raw.githubusercontent.com/jenifly/jenifly.github.io/master/' + a + '.md', res => {
        this.initMarked()
        this.t = 0
        this.content = marked(res)
        this.catalogue()
        this.loading = false
        this.$nextTick(() => {
          this.$refs.sct.scrollTop = Number(this.cookie.get('t') || 0)
          let z = this.cookie.get('a')
          if(z){
            this.$refs.aside.scrollLeft = Number(z.split('-')[0])
            this.$refs.aside.scrollTop = Number(z.split('-')[1])
          }
        })
      })
    },
    mousedown (e) {
      let disX = e.clientX
      let w = this.$refs.aside.clientWidth
      this.$refs.aside.style.transitionDuration = '0s'
      document.body.style.userSelect = 'none'
      document.onmousemove = (e) => {
        this.$refs.aside.style.width = Math.max(w + e.clientX - disX, 200) + 'px'
        if(!this.content) this.yi = Math.floor(this.$refs.sct.clientWidth / 440)
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
        res = res.sort((a, b) => a.type.length<b.type.length?-1:0)
        if(s) return this.$set(s, 'child', res)
        this.notes = res
      })
    },
    initMarked () {
      this.init = true
      let rendererMD = new marked.Renderer()
      rendererMD.heading = (text, level, raw) => {
        // 目录， 入队
        this.gs.push([text, level, this.t])
        return `<h${level} id=t${this.t++}>${text}</h${level}>\n`
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
    click (i, j) {
      if(i.download_url) {
        if(decodeURIComponent(this.$route.query.i) + '.md' == i.path) return
        if(this.cacheLi) this.cacheLi.classList.remove('active')
        j.classList.add('active')
        this.content = ''
        this.loading = true
        this.title = document.title = i.name.split('.')[0]
        this.doGet(i.download_url, res => {
          if(!this.init) this.initMarked()
          this.t = 0
          this.content = marked(res)
          this.catalogue()
          this.loading = false
          this.r = 0
        })
        this.cacheLi = j
        let a = encodeURIComponent(i.path.split('.')[0])
        this.cookie.set('u', a, 1)
        this.$router.push({path: '/notebook', query: {i: a}})
      }else {
        if(!i.child) {
          if(this.s) return; else this.s = 1
          return this.doGet(this.baseUrl + i.path, res => {
          this.$set(i, 'child', res)
          let a = document.createElement('ul')
          for(let b of i.child) {
            let c = document.createElement('li')
            c.onclick = () => this.click(b, c)
            c.innerHTML = `<svg viewBox="0 0 1024 1024">${this.svg[b.type+(b.o?1:'')]}</svg>${b.name.split('.')[0]}`
            a.appendChild(c)
          }
          this.insertAfter(a, j)
          this.s = 0
          this.$set(i, 'o', !i.o)
          j.firstChild.innerHTML = `<svg viewBox="0 0 1024 1024">${this.svg[i.type+(i.o?1:'')]}</svg>`
        })
        }
        this.$set(i, 'o', !i.o)
        j.firstChild.innerHTML = `<svg viewBox="0 0 1024 1024">${this.svg[i.type+(i.o?1:'')]}</svg>`
        j.nextSibling.style.display = i.o?'block':'none'
        // Cookie cache data to prevent data loss when refreshing
        // this.cookie.set('aside', this.notes, 10)
      }
    },
    insertAfter (e, t) {
      let p = t.parentNode
      if(p.lastChild == t){
        p.appendChild(e)
      }else{
        p.insertBefore(e, t.nextSibling)
      }
    }
  }
}
</script>
