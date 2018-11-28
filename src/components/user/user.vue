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
        <el-input placeholder="请输入内容" clearable class="searchInput input-with-select" v-model="query">
    <el-button slot="append" icon="el-icon-search" @click="handleSearch" ></el-button>

  </el-input>
   <el-button type="primary" @click="showAddUserDia">添加用户</el-button>
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
             inactive-color="#ff4949" @change="handleSwitchChange(scope.row)">
            </el-switch>
         </template>
      </el-table-column>
      <el-table-column
        label="操作">
         <template slot-scope="scope">
       <el-row>
        <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditUserDia(scope.row)"></el-button>
        <el-button size="mini" plain  type="danger" icon="el-icon-delete"  circle @click="showMegBox(scope.row.id)"></el-button>
        <el-button size="mini" plain  type="success" icon="el-icon-check" circle @click="handleShowSetRole(scope.row)"></el-button>
      </el-row>
        </template>

      </el-table-column>

    </el-table>
    <!-- 分页 -->
  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :currentPage="pagenum"
  :page-size="pagesize"
  :page-sizes="[2,4,6,8]"
   layout="total, sizes, prev, pager, next, jumper"
  :total="total">
</el-pagination>
<!-- 添加用户对话框 -->
<el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
  <el-form :model="form">
    <el-form-item label="用户名称" label-width="100px">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑用户对话框 -->
<el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
  <el-form :model="form">
    <el-form-item label="用户名称" label-width="100px">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
    <el-button type="primary" @click="handleEdit">确 定</el-button>
  </div>
</el-dialog>
<!-- 显示分配角色的对话框 -->
<el-dialog title="分配角色" :visible.sync="setRoleDialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户名" >
     {{currentname}}
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="currRoleId">
        <el-option label="请选择" value="-1"></el-option>
        <el-option v-for="(v,i) in roles" :key="i" :label="v.roleName" :value="v.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="setRoleDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleSetRole">确 定</el-button>
  </div>
</el-dialog>

</el-card>
</template>

<script>
export default {
  created () {
    this.getUserList()
  },
  data () {
    return {
      query: '',
      // 当前页码
      pagenum: 1,
      // 每页显示条数
      pagesize: 2,
      total: -1,
      userlist: [
        { create_time: '',
          email: '',
          id: '',
          mg_state: '',
          mobile: '',
          role_name: '',
          username: ''}
      ],
      // 添加对话框属性
      setRoleDialogFormVisible:false,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      
      // 用户表单数据
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      currentname:'',
      currentid:-1,
      roles:[],
      currRoleId:-1
    }
  },
  methods: {
    
//显示分配角色的对话框
    async handleShowSetRole(user){
      this.setRoleDialogFormVisible=true
      this.currentname=user.username
      this.currentid=user.id
        // 获取所有角色的名称
      const res = await this.$http.get('roles')
     this.roles=res.data.data 
     // 获取当前用户的角色的id
     const res2 = await this.$http.get(`users/${user.id}`)
     this.currRoleId=res2.data.data.rid
    },
    //分配角色功能
   async handleSetRole(){
        const res=await this.$http.put(`users/${this.currentid}/role`,{rid:this.currRoleId})
        const {meta:{status,msg}}=res.data
        if(status===200){
          this.setRoleDialogFormVisible=false
          
        }
    },
    //修改用户状态
   async handleSwitchChange(user){
      const res=await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      console.log(res)
    },
    // 显示编辑对话框
    showEditUserDia (users) {
      this.form = users
      this.dialogFormVisibleEdit = true
    },
    // 处理编辑的表单的提交
    async handleEdit () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      console.log(this.form)
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      console.log(res)
      const {meta: {status, msg}} = res.data
      if (status === 200) {
        this.$message.success(msg)
        this.dialogFormVisibleEdit = false
        this.getUserList()
      }
    },

    // 删除-打开提示框
    showMegBox (userId) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除请求
        const res = await this.$http.delete(`users/${userId}`)
        this.getUserList()

        this.$message({
          type: 'success',
          message: res.data.meta.message
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 显示添加对话框
    showAddUserDia () {
      this.dialogFormVisibleAdd = true
    },
    // 添加用户
    async addUser () {
      this.dialogFormVisibleAdd = false
      const res = await this.$http.post('users', this.form)
      const {
        meta: {status, msg}
      } = res.data
      if (status === 201) {
        this.$message.success(msg)
        this.getUserList()
        this.form = ''
      } else {
        this.$message.error(msg)
      }
    },
    // 搜索框
    handleSearch () {
      this.pagenum = 1
      this.getUserList()
    },
    // 分页
    handleSizeChange (val) {
      // size发生变化
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      // 页码发生变化
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    // 获取列表数据
    async getUserList () {
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // console.log(res)
      const {data: {total, users}, meta: {status, msg}} = res.data
      if (status === 200) {
        this.total = total
        this.userlist = users
        this.$message.success(msg)
      } else {
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
