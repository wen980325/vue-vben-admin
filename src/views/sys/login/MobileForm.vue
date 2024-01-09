<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <AForm class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <AFormItem name="mobile" class="enter-x">
        <AInput
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </AFormItem>
      <AFormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </AFormItem>

      <AFormItem class="enter-x">
        <AButton type="primary" size="large" block @click="handleLogin" :loading="loading">
          {{ t('sys.login.loginButton') }}
        </AButton>
        <AButton size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </AButton>
      </AFormItem>
    </AForm>
  </template>
</template>
<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import { CountdownInput } from '/@/components/CountDown'
import LoginFormTitle from './LoginFormTitle.vue'
import { useI18n } from '/@/hooks/web/useI18n'
import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  mobile: '',
  sms: '',
})

const { validForm } = useFormValid(formRef)

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)

async function handleLogin() {
  const data = await validForm()
  if (!data) return
  console.log(data)
}
</script>
