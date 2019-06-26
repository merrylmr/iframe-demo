<template>
  <div class="about">
    <h1>This is an about page</h1>
    <iframe-comp :routeName="'about'"></iframe-comp>
  </div>
</template>
<script>
  import iframeComp from '@/components/iframe.vue'

  export default {
    name: 'about-page',
    components: {
      iframeComp
    },
    mounted() {
      this.iframeCommunicate.on('innerInit', (data) => {
        console.log('innerInit about', data)
      })
    }
  }
</script>