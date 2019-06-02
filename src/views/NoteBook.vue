<template>
  <div class="home">
  </div>
</template>

<script>
export default {
  created () {
    this.doGet('file-list/master/notes', res => console.log(res))
  }
}
</script>
