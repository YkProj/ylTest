<template>
  <div id="app">
    <div v-html="message"></div>
    <label for="r1">修改颜色</label><input type="checkbox" v-model="use" id="r1">
    <div v-bind:class="{'class1':use}">
      v-bind :class指令
    </div>
    {{5+5}}<br>
	  {{ ok ? 'YES' : 'NO' }}<br>
    <!-- 反转字符串 -->
	  {{ bindMessage.split('').reverse().join('') }} 
  	<div v-bind:id="'list-' + id">菜鸟教程</div>
  </div>
</template>
<script>
export default {
  name: "Bind",
  data() {
    return {
      message:'<h1>学习教程</h1>',
      use:false,
      ok:true,
      bindMessage:'hello',
      id:1
    };
  }
};
</script>
<style>
.class1{
  background: #444;
  color: #eee;
}
</style>


