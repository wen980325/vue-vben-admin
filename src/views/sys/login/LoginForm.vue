<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <AForm
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <AFormItem name="account" class="enter-x">
      <AInput
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </AFormItem>
    <AFormItem name="password" class="enter-x">
      <AInputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </AFormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <AFormItem>
          <!-- No logic, you need to deal with it yourself -->
          <ACheckbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </ACheckbox>
        </AFormItem>
      </ACol>
      <ACol :span="12">
        <AFormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <AButton type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </AButton>
        </AFormItem>
      </ACol>
    </ARow>

    <AFormItem class="enter-x">
      <AButton type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </AButton>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </AFormItem>
    <ARow class="enter-x">
      <ACol :md="8" :xs="24">
        <AButton block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </AButton>
      </ACol>
      <ACol :md="6" :xs="24">
        <AButton block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </AButton>
      </ACol>
    </ARow>
  </AForm>
</template>
<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'

import LoginFormTitle from './LoginFormTitle.vue'

import { useI18n } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'

import { useUserStore } from '/@/store/modules/user'
import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin'
import { useDesign } from '/@/hooks/web/useDesign'
//import { onKeyStroke } from '@vueuse/core';

const { t } = useI18n()
const { notification, createErrorModal } = useMessage()
const { prefixCls } = useDesign('login')
const userStore = useUserStore()

const { setLoginState, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)
const rememberMe = ref(false)

const formData = reactive({
  account: 'vben',
  password: '123456',
})

const { validForm } = useFormValid(formRef)

//onKeyStroke('Enter', handleLogin);

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

async function handleLogin() {
  const data = await validForm()
  if (!data) return
  try {
    loading.value = true
    const userInfo = await userStore.login({
      password: data.password,
      username: data.account,
      mode: 'none', //不要默认的错误提示
    })
    if (userInfo) {
      notification.success({
        message: t('sys.login.loginSuccessTitle'),
        description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
        duration: 3,
      })
    }
  } catch (error) {
    createErrorModal({
      title: t('sys.api.errorTip'),
      content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
      getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
    })
  } finally {
    loading.value = false
  }
}
</script>
