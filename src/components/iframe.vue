<template>
  <!--内层iframe-->
  <iframe
    :src="`/inner.html/#${routeName}`"
    frameborder="0"
    id="inner-iframe"
    style="width:100%;height:100vh"></iframe>
</template>

<script>
  export default {
    name: 'iframe-comp',
    props: {
      routeName: {
        type: String,
        default: 'home'
      }
    }
  }
</script>