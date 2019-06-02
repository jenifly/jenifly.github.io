<template>
  <div id="app">
    <Header/>
    <keep-alive>
      <router-view class="content"/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  components: {
    Header: () => import('./components/Header')
  }
}
</script>
