<template>
  <el-card>
    <my-bread level1="商品管理" level2="分类参数"></my-bread>
    <el-alert title="只允许第三级分类" type="error"></el-alert>
     <!-- 级联选择器 -->
     <el-form class="form" label-width="80px">
    <el-form-item label="商品分类">
      <el-cascader
      :show-all-levels="false"
        expand-trigger="hover"
        clearable
        :options="options"
        :props="defaultProps"
        v-model="selectedOptions"
        @change="handleChange"
        
      ></el-cascader>
    </el-form-item>
    </el-form>
     <!-- tabs -->
    <el-tabs v-model="active" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="1">
      <el-button type="danger">设置动态参数</el-button>
      <!-- 表格 -->
      <el-table
    :data="dynamicsParams"
    style="width: 100%">
    <el-table-column type="expand" label="#">
      <template slot-scope="scope">
      <el-tag
  :key="tag"
  v-for="tag in scope.row.attr_vals"
  closable
  :disable-transitions="false"
  @close="handleClose(scope.row,tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm(scope.row)"
  @blur="handleInputConfirm(scope.row)"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>      


      </template>
    </el-table-column>
    <el-table-column
      label="属性名称"
      prop="attr_name">
    </el-table-column>
    <el-table-column
      label="操作"
      prop="name">
      <template slot-scope="scope">
              <el-button
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
              
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
    </el-table-column>
  </el-table>
    </el-tab-pane>
    <el-tab-pane label="静态参数" name="2">
        <el-button type="danger">设置静态参数</el-button>
        <el-table
      :data="arrStaticparams"
      style="width: 100%">
      <el-table-column
     type="index"
        label="#"
        width="180">
      </el-table-column>
      <el-table-column
        prop="attr_name"
        label="属性名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="attr_vals"
        label="属性值">
      </el-table-column>
       <el-table-column
      label="操作">
      <template slot-scope="scope">
              <el-button
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
              
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
    </el-table-column>
    </el-table>
    </el-tab-pane>
  </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
     
        inputVisible: false,
        inputValue: '',
        active:'1',
    dynamicsParams:[],
    arrStaticparams:[],
      options: [],
      defaultProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      selectedOptions: [1, 3, 6],
      

    };
  },
  created(){
      this.loadOptions()
  },
  methods:{
    //tabs
   async handleClose(attr,tag) {
        attr.attr_vals.splice(attr.attr_vals.indexOf(tag), 1);
        const res=await this.$http.delete(`categories/${this.selectedOptions[2]}/attributes/${attr.attr_id}`)
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

    async  handleInputConfirm(attr) {
        let inputValue = this.inputValue;
        if (inputValue) {
          attr.attr_vals.push(inputValue);
        }
         
        const res=await this.$http.post(`categories/${this.selectedOptions[2]}/attributes`,{
           attr_name:attr.attr_name,
           attr_sel:'many',
           attr_vals:attr.attr_vals.join(",")
        })
        console.log(res)

        this.inputVisible = false;
        this.inputValue = '';


      
    },
     // tab切换时
    async handleClick(){
      if(this.active==="2"){
        if(this.selectedOptions.length===3){
          //获取静态资源
         const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
        this.arrStaticparams = res.data.data
        console.log(res)
        }
      }
           
    },
    async handleChange(){
        if(this.selectedOptions.length===3){
           //获取动态资源
             const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
             console.log(res)
        this.dynamicsParams = res.data.data
        console.log(this.dynamicsParams)
        this.dynamicsParams.forEach(item => {
          item.attr_vals =
            item.attr_vals.trim().length === 0
              ? []
              : item.attr_vals.trim().split(",");
                });
       
        }
      },
       async loadOptions(){
      const res = await this.$http.get('categories?type=3')
      // console.log(res)
      this.options = res.data.data
    }
    
  }
};
</script>

<style>
</style>
