<template>
  <el-card class="box-card">
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="addRole">
      <el-col>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="rolelist" style="width: 100%">
      <!-- 表格展开 -->
      <el-table-column type="expand" width="50">
      <template slot-scope="scope">
      <el-row v-for="(item1,index) in scope.row.children" :key="index">
          <el-col :span="4">
              <el-tag @close="handleClose(scope.row,item1.id)"  closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
          </el-col>
          <el-col :span="20">
           <el-row v-for="(item2,index) in item1.children" :key="index">
               <el-col :span="4">
                   <el-tag @close="handleClose(scope.row,item2.id)"  closable type="success">{{item2.authName}}</el-tag>
                   <i class="el-icon-arrow-right"></i>
               </el-col>
               <el-col :span="20">
                    <el-tag @close="handleClose(scope.row,item3.id)" closable type="info" v-for="(item3,index) in item2.children" :key="index">{{item3.authName}}</el-tag>
               </el-col>
            </el-row>
          </el-col>
      </el-row>

      <el-row v-if="scope.row.children.length===0">
         <el-row :span="24">未分配权限</el-row>
      </el-row>
      </template>
      </el-table-column>
       <!-- 表格部分 -->
      <el-table-column type="index" lable="#" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button
              size="mini"
              plain
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEditUserDia(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              plain
              type="danger"
              icon="el-icon-delete"
              circle
              @click="showMegBox(scope.row.id)"
            ></el-button>
            <el-button
              size="mini"
              plain
              type="success"
              icon="el-icon-check"
              circle
              @click="handleOpenDialog(scope.row)"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
     <!-- 分配权限-显示树形结构 -->
     <el-dialog
  title="分配权限"
  :visible.sync="dialogFormVisibleRight"
  >

  <el-tree
    ref="tree"
   :data="treedata"
   :props="defaultProps"
   :default-checked-keys="checkedList"
   node-key="id"
   show-checkbox
   default-expand-all>
</el-tree>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
    <el-button type="primary" @click="setRoleRight">确 定</el-button>
  </span>
</el-dialog>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      rolelist: [],
      dialogFormVisibleRight: false,
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      checkedList: [],
      currentRoleId: -1
    }
  },
  created () {
    this.getRolelist()
  },
  methods: {
    // 更改权限
    async setRoleRight () {
      const CheckedKeys = this.$refs.tree.getCheckedKeys()
      const HalfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      const newArr = [...CheckedKeys, ...HalfCheckedKeys]
      const res = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
        rids: newArr.join('.')
      })
      const {meta: {status}} = res.data
      if (status === 200) {
        this.dialogFormVisibleRight = false
        this.getRolelist()
      }
    },
    // 显示树形结构页面
    async handleOpenDialog (role) {
      this.currentRoleId = role.id
      const res = await this.$http.get('/rights/tree')
      this.treedata = res.data.data
      let arr = []
      role.children.forEach((item1) => {
        // arr.push(item1.id)
        item1.children.forEach((item2) => {
          // arr.push(item2.id)
          item2.children.forEach((item3) => {
            arr.push(item3.id)
          })
        })
      })
      this.checkedList = arr
      this.dialogFormVisibleRight = true
    },
    // 删除角色指定权限
    async handleClose (role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      const {meta: { status, msg }, data} = res.data
      if (status === 200) {
        this.$message.success(msg)
        role.children = data
      }
    },
    // 获取
    async getRolelist () {
      const res = await this.$http.get('roles')
      console.log(res)
      this.rolelist = res.data.data
    }
  }
}
</script>

<style>
.addRole {
  margin-top: 20px;
}
</style>
