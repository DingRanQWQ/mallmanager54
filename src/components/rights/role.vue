<template>
  <el-card class="box-card">
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="addRole">
      <el-col>
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="rolelist" style="width: 100%">
      <el-table-column type="expand" width="50">
      <template slot-scope="scope">
      <el-row v-for="(item1,index) in scope.row.children" :key="index">
          <el-col>
              <el-tag>{{item1.authName}}</el-tag>
          </el-col>
          <el-col>
           <el-row v-for="(item2,index) in item1.children" :key="index">
               <el-col>
                   <el-tag>{{item2.authName}}</el-tag>
               </el-col>
               <el-col >
                    <el-tag v-for="(item3,index) in item2.children" :key="index">{{item3.authName}}</el-tag>
               </el-col>
               
            </el-row>   
          </el-col>
      </el-row>
      </template>
      </el-table-column>




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
              @click="handleShowSetRole(scope.row)"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rolelist: []
    };
  },
  created() {
    this.getRolelist();
  },
  methods: {
    async getRolelist() {
      const res = await this.$http.get('roles');
      console.log(res);
      this.rolelist = res.data.data;
    }
  }
};
</script>

<style>
.addRole {
  margin-top: 20px;
}
</style>
