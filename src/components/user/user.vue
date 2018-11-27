<template>
 <el-card class="box-card">
     <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item>首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 搜索框 -->
   <el-row class="searchArea">
     <el-col :span="24">
        <el-input placeholder="请输入内容" class="searchInput input-with-select" :v-model="query" >
    <el-button slot="append" icon="el-icon-search"></el-button>
    
  </el-input>
   <el-button type="primary">添加用户</el-button>
     </el-col>
   </el-row>
   <!-- 表格 -->
  
    <el-table
      :data="userlist"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="80">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
        </el-table-column>
        <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
       <el-table-column
        prop="create_time"
        label="创建时间">
      </el-table-column>
       <el-table-column
        label="用户状态">
      </el-table-column>
    </el-table>


</el-card>
</template>

<script>
export default {
  created(){
     this.getUserList();
  },
  data() {
        return {
          query:'',
          pagenum:2,
          pagesize:2,
          userlist: [
            { create_time: '',
          email: '',
          id: '',
          mg_state: '',
          mobile: '',
          role_name: '',
          username: ''}
          ]
        }
        
      },
  methods:{
    async getUserList(){
      const  AUTH_TOKEN=localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

     const res=await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
     console.log(res)
     const {data:{users},meta:{status,msg}}=res.data
     if(status===200){
       this.userlist=users
    }else{
      this.$message.error(msg)
    }
    }
  }
    }

</script>

<style>
.box-card{
  height:100%;
}
.searchArea{
  margin-top:10px;
  margin-bottom: 10px;
}
.searchInput{
  width:350px;;
}
</style>
