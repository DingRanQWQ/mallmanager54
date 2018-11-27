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
        <template slot-scope="scope">
          {{scope.row.create_time | fmtDate}}
        </template>
      </el-table-column>
       <el-table-column
        label="用户状态">
         <template slot-scope="scope">
            <el-switch
             v-model="scope.row.mg_state"
             active-color="#13ce66"
             inactive-color="#ff4949">
            </el-switch>
         </template>
      </el-table-column>
      <el-table-column
        label="操作">
         <template slot-scope="scope">
       <el-row>
        <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
        <el-button size="mini" plain  type="danger" icon="el-icon-delete"  circle></el-button>
        <el-button size="mini" plain  type="success" icon="el-icon-check" circle></el-button>
      </el-row>
        </template>

      </el-table-column>
     
    </el-table>
    <!-- 分页 -->
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="pagenum"
  :page-size="pagesize"
  :page-sizes="[2,4,6,8]"
  layout="prev, pager, next"
  :total="total">
</el-pagination>


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
          //当前页码
          pagenum:1,
          //每页显示条数
          pagesize:2,
          total:-1,
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
    //分页
    handleSizeChange(val) {
      // size发生变化
      console.log(`每页 ${val} 条`);
      this.pagesize=val
      this.pagenum=1
      this.getUserList()
    },
    handleCurrentChange(val) {
      // 页码发生变化
      console.log(`当前页: ${val}`);
      this.pagenum=val
      this.getUserList()
    },
    //获取列表数据
    async getUserList(){
      const  AUTH_TOKEN=localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

     const res=await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
     console.log(res)
     const {data:{total,users},meta:{status,msg}}=res.data
     if(status===200){
       this.total=total
       this.userlist=users
       this.$message.success(msg)
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
