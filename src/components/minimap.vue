<template>
    <div class="miniContent">
        <page09></page09>
    </div>
</template>

<script>
import page09 from './page09.vue'
export default {
  name: "minimap",
  components:{
      page09
  },
};
</script>

<style scoped>
.miniContent {
  background-color: rgba(92, 93, 97, 0.71);
  width: 500px;
  height: 500px;
  position: absolute;
  z-index: 999999;
  top: 90px;
  right: 45px;
}
</style>



