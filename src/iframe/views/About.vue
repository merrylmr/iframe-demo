<template>
  <div class="about">
    <h1>inner--about-page</h1>
  </div>
</template>
<script>
  export default {
    mounted() {
      this.iframeCommunicate.post('innerInit', {
        page: 'about'
      })
    }
  }
</script>