<template>
<div class="login-wrap">

    <el-form label-position="top" label-width="80px" :model="formdata" class="login-form">
        <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formdata.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formdata.password"></el-input>
  </el-form-item>
    <el-button @click.prevent="handleLogin" type="primary" class="login-button">登录</el-button>
</el-form>
</div>

</template>

<script>

export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formdata)
      // console.log(res)
      const
        {
          data,
          meta: {status, msg}
        } = res.data
      if (status === 200) {
        localStorage.setItem('token', data.token)
        this.$message.success(msg)
        this.$router.push({name: 'home'})
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.login-wrap{
    height: 100%;
    background-color: #324152;
    display:flex;
    justify-content: center;
    align-items: center;
}
.login-wrap .login-form{
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
}
.login-wrap .login-form .login-button{
    width: 100%;
}

</style>
