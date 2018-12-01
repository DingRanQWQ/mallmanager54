<template>
    <el-button @click="go" type="success" plain>添加商品</el-button>
</template>

<script>
export default {
   methods:{
       go(){
           this.$router.push({name:'goodsadd'})
   }
   }
}
</script>

<style>

</style>
