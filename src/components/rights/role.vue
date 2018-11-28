<template>
    <el-card class="box-card">
     <!-- 面包屑 -->
   <my-bread level1="权限管理" level2="角色列表"></my-bread>
   <!-- 表格 -->
   <el-table
      :data="rightlist"
      style="width: 100%">
      <el-table-column
     type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
      </el-table-column>
    </el-table>
   </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
