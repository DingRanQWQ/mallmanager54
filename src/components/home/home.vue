<template>
    <el-container class="container">
  <el-header class="header">
   <el-row>
  <el-col :span="4"><div class="grid-content bg-purple">
      <img src="../../assets/a.png" width="207px" height="56px" alt="该图片无法显示"></div></el-col>
  <el-col :span="19" class="middle"> <div class="grid-content bg-purple-light"><h2>电商后台管理系统</h2></div></el-col>
  <el-col :span="1"><a href="#" class="loginout" @click="handleSignout">退出</a> </el-col>
</el-row>
</el-header>

  <el-container>

    <el-aside class="aside" width="200px">
    <el-menu class="el-menu-vertical-demo" :router="true" :unique-opened="true">

      
      <el-submenu v-for="(item1,i) in menus" :key="i" :index="''+item1.order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item1.authName}}</span>
        </template>
           <el-menu-item v-for="(item2,index) in item1.children" :key="index" :index="item2.path">
                <i class="el-icon-location"></i>
               {{item2.authName}}</el-menu-item>
      </el-submenu>
    


    </el-menu>
        </el-aside>

    <el-main class="main">
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data(){
    return{
       menus:[]
    }
  },
  mounted(){
    this.loadData()
  },
  methods: {
   async loadData(){
      const res=await this.$http.get('menus')
      console.log(res)
      const {data,meta:{status}}=res.data
      if(status===200){
        this.menus=data
      }
    },

    handleSignout () {
      localStorage.clear()
      this.$router.push({name: 'login'})
      this.$message.success('退出成功')
    }
  }
}
</script>

<style>
.container{
    height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.header .middle {
    color: #fff;
    text-align: center;
}
.header .loginout{
    line-height: 60px;
    text-decoration: none;
}
.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
