<template lang="html">
  <div class="main">

    <div class="right"></div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      items: []
    }
  }
}
</script>
<style lang="css" scoped>
  .head {
    width: 100%;
    height: 2rem;
  }

  .header {
    width: 100%;
    height: 2rem;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    border-bottom: 2px solid #ff8000;
  }

  .header h4 {
    width: 100%;
    text-align: center;
    line-height: 2rem;
    font-size: 1.4rem;
  }
</style>
