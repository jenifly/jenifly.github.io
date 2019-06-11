<template>
  <div class="notebook">
    <div class="tb" :class="r?'tb-a':''">
      <svg v-for="(i,j) in tbs" :class="tb==j?'active':''" viewBox="0 0 1024 1024" @click="tb=j;cookie.set('tb',j,1)" v-html='svg[i]'/>
    </div>
    <svg ref="menu" v-show="!loading" @mousedown="svgMD" :style="{'bottom':ud?'16px':'-48px'}" :class="['menu', r?'menu-a':'']" viewBox="0 0 1024 1024" v-html="svg.menu" @click="r=!r"></svg>
    <aside ref="aside" :class="['scroll',r?'aside-a':'']">
      <ul style="padding-top:1em" v-show="tb==0">
        <li v-for="(i, j) in notes" :key="j" @click.self="click(i, $event.target)"><svg viewBox="0 0 1024 1024" v-html="svg[i.type]"></svg>{{i.name.split('.')[0]}}
        </li>
      </ul>
      <ul ref="catalogue" class="ctlg" v-show="tb==1">
        <p v-if="!$route.query.i" style="text-align:center;margin-right:1.2em">请先打开一个文件吧</p>
      </ul>
    </aside>
    <div class="touch" :class="loading?'loading':''" @mousedown="mousedown"></div>
    <section :style="{overflow:r?'hidden':'auto'}" ref="sct" :class="[loading?'loading':'', 'scroll']">
      <h3 class="ph" v-if="!content&&!loading">这是布置在GitHub Pages上的静态Vue项目，发现bug，<br>欢迎在 <a href="https://github.com/jenifly/jenifly.github.io" target="_blank">https://github.com/jenifly/jenifly.github.io</a> 提交issues</h3>
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
        menu: '<path d="M382.083 103.466c-63.464-1.533-127.026-1.561-190.487 0.056-53.88 1.372-85.947 33.283-87.526 87.481-1.798 61.735-1.627 123.592-0.105 185.34 1.405 57.042 33.666 88.862 89.987 91.055 30.847 1.2 61.778 0.214 92.673 0.214v0.084c29.177 0 58.354 0.006 87.532-0.01 3.43 0 6.875 0.043 10.292-0.216 48.928-3.716 81.464-31.602 83.804-80.677 3.181-66.767 3.15-133.886 0.34-200.68-2.194-52.18-34.273-81.385-86.51-82.647z m0.727 223.135c-1.853 39.629-13.76 53.399-51.558 55.395-30.725 1.622-61.703 1.765-92.399-0.15-32.22-2.01-46.292-15.941-48.33-48.552-2.025-32.392-2.108-65.126 0.084-97.498 2.219-32.758 16.121-45.288 49.214-46.935 29.033-1.446 58.217-1.13 87.29-0.204 42.456 1.353 53.884 13.188 55.727 55.78 0.592 13.67 0.092 27.387 0.092 41.083-0.02 13.695 0.518 27.415-0.12 41.081zM468.883 657.431c-4.914-60.1-41.873-98.957-102.147-102.763-52.991-3.346-106.533-3.413-159.516-0.013-61.945 3.977-100.908 45.842-103.178 107.37-1.834 49.716-1.806 99.605 0 149.324 2.232 61.528 42.13 104.63 102.68 108.128 53.034 3.063 106.506 2.894 159.565 0.06 58.998-3.15 97.39-42.913 102.53-102.565 2.2-25.551 0.367-51.451 0.367-77.191l0.08-0.001c0-27.46 1.85-55.071-0.381-82.349zM382.676 782.81c-2.191 34.758-12.473 47.623-45.629 49.797-34.02 2.23-68.343 1.291-102.466-0.024-25.612-0.987-42.22-15.758-43.434-41.638-1.677-35.784-2.509-71.85 0.088-107.519 2.16-29.666 15.98-40.487 47.82-41.924 30.705-1.386 61.557-1.324 92.274-0.118 37.12 1.456 48.88 13.204 51.308 49.153 1.033 15.313 0.173 30.753 0.173 46.135 0.027 15.382 0.832 30.817-0.134 46.138zM638.575 466.817c66.85 2.183 133.883 2.232 200.728-0.029 48.107-1.626 78.502-34.315 80.95-82.898 1.64-32.522 0.314-65.193 0.314-97.798h0.18c0-29.173 0.002-58.345-0.006-87.518 0-3.433 0.093-6.874-0.12-10.295-3.237-51.777-32.66-83.203-84.46-84.65-65.155-1.824-130.44-1.78-195.6 0.026-49.255 1.363-81.717 31.976-83.38 80.049-2.312 66.843-2.187 133.87-0.181 200.732 1.448 48.3 33.485 80.811 81.575 82.38zM741.2 188.405c93.184 0.015 94.452 1.293 94.464 95.22 0.013 96.831-1.987 98.873-96.789 98.868-94.393-0.003-95.62-3.049-97.83-98.688-2.4-103.803 20.564-97.124 100.155-95.4zM920.572 648.267c-1.48-60.79-30.968-91.401-92.039-94.662-29.17-1.558-58.49-0.269-87.743-0.269v0.082c-30.974 0-61.945-0.023-92.918 0.034-3.43 0.005-6.883 0.302-10.287 0.754-49.282 6.534-79.299 35.872-80.674 84.647a3477.609 3477.609 0 0 0 0.02 196.134c1.362 48.254 32.605 80.758 80.595 84.46 35.921 2.77 72.291 2.164 108.32 0.313 28.821-1.48 47.916-22.114 46.583-45.146-1.247-21.556-18.569-37.536-46.166-40.082-18.794-1.733-37.942 0.3-56.714-1.548-33.033-3.254-45.768-15.985-47.505-49.427a897.595 897.595 0 0 1 0.012-92.884c1.76-33.962 14.537-47.378 47.042-49.022 32.61-1.65 65.425-1.604 98.043-0.06 33.31 1.575 45.544 14.444 48.07 47.957 1.42 18.832-0.68 37.952 1.06 56.734 2.577 27.82 18.189 42.528 42.153 42.564 24.261 0.037 40.096-14.295 41.679-42.527 1.828-32.595 1.266-65.38 0.47-98.052z"></path>',
        cr: '<path d="M407.808 257.28l-46.336 46.336L569.907 512 361.472 720.384l46.336 46.336 208.384-208.384L662.528 512l-46.336-46.336z"></path>'
      }, notes: [], title: '', content: '', init: false, r: 0, k: 1, yiyan: [], loading: false, cacheLi: undefined, tbs: ['ku', 'catalogue' ], tb: 0, yi: 3, gs: [], ac: [], cac: '#a0', s: 0, ud: 1
    }
  },
  created () {
    this.doGet('https://raw.githubusercontent.com/jenifly/jenifly.github.io/master/res/yiyan/0.josn', res => this.yiyan = res)
    // if(this.cookie.get('u')) this.$router.push({path: '/notebook', query: {i: this.cookie.get('u')}})
    this.$nextTick(() => {
      this.load(this.$route.query.i)
      this.yi = Math.floor(this.$refs.sct.clientWidth / 440)
      let p = 0, pp = 0, w = 0, l = 0, s = 0, a
      let touchmove = (e) => {
        this.$refs.menu.style.left = Math.max(Math.min(w+e.targetTouches[0].clientX-l, s), 0)
      }
      let touchend = (e) => {
        this.$refs.menu.style.transitionDuration = '.3s'
        document.removeEventListener("touchmove", touchmove)
        document.removeEventListener('touchend', touchend)
      }
      this.$refs.menu.addEventListener('touchstart', (e) => {
        l = e.targetTouches[0].clientX
        w = this.$refs.menu.getBoundingClientRect().x
        s = document.documentElement.clientWidth - this.$refs.menu.clientWidth
        this.$refs.menu.style.transitionDuration = '0s'
        document.addEventListener("touchmove", touchmove)
        document.addEventListener('touchend', touchend)
      })
      this.$refs.sct.addEventListener('scroll', (e) => {
        if(this.r) return
        let c = e.target.scrollTop
        this.ud = p >= c
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
        setTimeout(() => {p = c}, 200)
      })
      this.$refs.aside.addEventListener('scroll', (e) => {
        let c = e.target.
        this.ud = pp > c.scrollTop
        this.cookie.set('a', c.scrollLeft + '-' + c.scrollTop, 1)
        setTimeout(() => {pp = c}, 200)
      })
      this.doGet(this.baseUrl + (s?s.path:'notes'), res => this.notes = res.sort((a, b) => a.type.length<b.type.length?-1:0))
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
    svgMD (e) {
      let l = e.clientX, w = this.$refs.menu.getBoundingClientRect().x, s = document.documentElement.clientWidth - this.$refs.menu.clientWidth
      this.$refs.menu.style.transitionDuration = '0s'
      document.body.style.userSelect = 'none'
      document.onmousemove = (e) => {
        let b = e.clientX - l
        if(Math.abs(b) < 5) return
        this.$refs.menu.style.left = Math.max(Math.min(w +b, s), 0)
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
        this.$refs.menu.style.transitionDuration = '.2s'
      }
    },
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
          this.r = 0
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
    initMarked () {
      this.init = true
      let rendererMD = new marked.Renderer()
      rendererMD.heading = (text, level, raw) => {
        // 目录， 入队
        this.gs.push([text, level, this.gs.length])
        return `<h${level} id=t${this.gs.length-1}>${text}</h${level}>\n`
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
        this.r = 0
        this.content = ''
        this.loading = true
        this.title = document.title = i.name.split('.')[0]
        this.doGet(i.download_url, res => {
          if(!this.init) this.initMarked()
          this.r = 0
          this.content = marked(res)
          this.catalogue()
          this.loading = false
        })
        this.cacheLi = j
        let a = encodeURIComponent(i.path.split('.')[0])
        this.cookie.set('u', a, 1)
        this.$router.push({path: '/notebook', query: {i: a}})
      }else {
        if(!i.child) {
          if(this.s) return; else this.s = 1
          return this.doGet(this.baseUrl + i.path, res => {
            this.$set(i, 'child', res.sort((a, b) => a.type.length<b.type.length?-1:0))
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
