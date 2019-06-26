<template>
  <div class="home">
    <!--内层iframe-->
    <iframe-comp :routeName="routeName"></iframe-comp>
  </div>
</template>

<script>
  // @ is an alias to /src
  import iframeComp from '@/components/iframe.vue'

  export default {
    name: 'home',
    components: {
      iframeComp
    },
    data() {
      return {
        routeName: 'home'
      }
    },
    methods: {},
    mounted() {
      this.iframeCommunicate.on('innerInit', (data) => {
        console.log('innerInit home', data)
      })
    }
  }
</script>
