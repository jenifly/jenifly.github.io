<template>
  <div class="home">
  </div>
</template>

<script>
export default {
  created () {
    var fso=new ActiveXObject("Scripting.FileSystemObject")
    var s=fso.GetFolder('/notes')
    var fn=new Enumerator(s.files)
    console.log(fn);
    
  }
}
</script>
