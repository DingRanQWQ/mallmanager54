<template>
<el-card class="box-card">
      <!-- 面包屑 -->
   <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 提示框 -->
   <el-alert class="el-alert"
    title="添加商品信息"
    type="success"
    show-icon>
  </el-alert>
   <!-- 步骤条 -->
   <el-steps :active="1*active" finish-status="success" simple style="margin-top: 20px">
  <el-step title="基本信息" ></el-step>
  <el-step title="商品参数" ></el-step>
  <el-step title="商品属性" ></el-step>
  <el-step title="商品图片" ></el-step>
  <el-step title="商品内容" ></el-step>
</el-steps>
 <!-- tabs选项卡 -->
  <el-form class="form" label-position="top" :model="form" label-width="80px">
  <el-tabs @tab-click="tabchange" tab-position="left" v-model="active" >
    <el-tab-pane name="1" label="基本信息">
         <el-form-item label="商品名称" >
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" >
          <el-input v-model="form.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="form.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
         expand-trigger="hover"
         :options="options"
         :props="defaultProps"
        v-model="selectedOptions"
        @change="handleChange">
        </el-cascader>
        </el-form-item>

    </el-tab-pane>
    <el-tab-pane name="2" label="商品参数">
         <el-form-item v-for="(item1,i) in dynamicsParams" :key="i" :label="item1.attr_name">
        <el-checkbox-group v-model="item1.attr_vals">
          <el-checkbox v-for="(item2,index) in item1.attr_vals" :key="index" :label="item2"></el-checkbox>
        </el-checkbox-group>
        </el-form-item>   
    </el-tab-pane>
    <el-tab-pane name="3" label="商品属性">
        <el-form-item v-for="(item,i2) in arrStaticparams" :key="i2" :label="item.attr_name">
          <el-input v-model="item.attr_vals"></el-input>
        </el-form-item>
    </el-tab-pane>
    <el-tab-pane name="4" label="商品图片">
        <el-upload
        action="http://127.0.0.1:8888/api/private/v1/upload"
        :header="headers"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
     
        list-type="picture">
     <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
    </el-tab-pane>
     <el-tab-pane name="5" label="商品内容">
         <el-button type="primary" @click="addGood">添加商品</el-button>
         <quill-editor class="editor" v-model="form.goods_introduce"></quill-editor>
     </el-tab-pane>
  </el-tabs>
    </el-form>
</el-card>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    components: {
        quillEditor
    },
    data(){
        return{
            active:"1",
            form:{
                goods_name:'',
                goods_price:'',
                goods_number:'',
                goods_weight:'',
                goods_introduce:'',
                goods_cat:'',  //以逗号分割的分类列表
                pics:[],
                attrs:[],   //商品的参数（数组）   
            },
            options:[],
            defaultProps:{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            selectedOptions:[1,3,6],
            dynamicsParams:[],
            arrStaticparams:[],
            headers:{
                Authorization:localStorage.getItem('token')
            },
            fileList:[]
        }
    },
    created(){
        this.loadOptions()
    },
    methods:{
        //发送表单
        async addGood(){
            //console.log(this.form)
            this.form.goods_cat=this.selectedOptions.join(",")
            const res=await this.$http.post('goods',this.form)
        },
        //图片上传
        handleRemove(file,fileList){
           console.log(file,fileList)
            //file.response.data.tmp_path
           let Index=this.form.pics.findIndex((item)=>{
               return item.pic===file.response.data.tmp_path
           })
           this.form.pics.splice(Index,1)
           console.log(this.form.pics)
        },
        handlePreview(file){
          console.log(file)
        },
        handleSuccess(file){
            console.log(file)
           //file.data.tmp_path
           this.form.pics.push({
               pic:file.data.tmp_path
           })
        },

        //tagchange
        async tabchange(){
        if(this.selectedOptions.length!==3){
                this.$message.warning('商品只能添加到三级分类')}
        if(this.active==='2'){
            const res=await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
            this.dynamicsParams=res.data.data
            this.dynamicsParams.forEach((item)=>{
                item.attr_vals=item.attr_vals.trim().length===0?[]:item.attr_vals.trim().split(',')
            })
        }else if(this.active==='3'){
             const res=await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
             this.arrStaticparams=res.data.data
            
        }
        },
        //获取三级联动表单数据
        async loadOptions(){
           const res=await this.$http.get('categories?type=3')
           //console.log(res)
           this.options=res.data.data
        },
        handleChange(){
           
           }
        }
    }

</script>

<style>
.el-alert{
    margin-top:20px;
}
.form {
    overflow: auto;
    height: 400px;
}
.ql-editor{
    min-height:300px;
}
</style>
