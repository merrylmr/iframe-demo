<template>
  <div class="inner-home">
    <h1>inner-home</h1>
    <el-button @click="postMessageOne">post message</el-button>
  </div>
</template>
<script>
  export default {
    name: 'inner-home',
    data() {
      return {}
    },
    methods: {
      postMessageOne(){
        this.iframeCommunicate.post('innerInit', {
          page: 'Home'
        })
      }
    },
    mounted() {
      // console.log('lalallal');
      // this.iframeCommunicate.post('innerInit', {
      //   page: 'Home'
      // })
    }
  }
</script>