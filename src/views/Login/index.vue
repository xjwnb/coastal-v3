<script lang="tsx" setup>
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router";
import type { FormInstance } from 'element-plus'
import { menuBackgroundColor, title } from "@/config/settings";
import { useUserStore } from "@/stores/user";
import { to } from "@/utils/to";

const userStore = useUserStore();
const router = useRouter();

const ruleFormRef = ref<FormInstance>()

const validatePwd = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入密码！'))
  }

  callback();

}

const validateUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入用户名！"));
  }
  callback()
}


const loginForm = reactive({
  username: 'admin',
  pwd: 'admin',
})

// 表单规则
const rules = reactive({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  pwd: [{ validator: validatePwd, trigger: 'blur' }],
})

// 登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async(valid) => {
    if (valid) {
      console.log('submit!')
      console.log(loginForm);
      const [err, res] = await to(userStore.setUser(loginForm.username));
      if (!err) {
        router.push({name: "home"});
      };

      
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<template>
  <div
    class="login-page"
    :style="{
      backgroundColor: menuBackgroundColor,
    }"
  >
    <div class="login-container">
      <h2>{{ title }}</h2>
      <el-form
        ref="ruleFormRef"
        :model="loginForm"
        status-icon
        :rules="rules"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            class="input-class"
            v-model="loginForm.username"
            autocomplete="new-password"
          >
            <template v-slot:prefix>
              <div class="svg-class">
                <svg-icon name="username" />
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            class="input-class"
            v-model.number="loginForm.pwd"
            type="password"
            autocomplete="new-password"
          >
            <template v-slot:prefix>
              <div class="svg-class">
                <svg-icon name="password" />
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 50%;
  min-width: 500px;

  h2 {
    color: #fff;
    text-align: center;
    font-size: 2rem;
    margin: 15px 0;
  }
}

.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-btn {
  width: 100%;
}
</style>


<style lang="scss">
.el-input--prefix {
  .el-input__inner {
    padding-left: 40px !important;
  }
}
</style>