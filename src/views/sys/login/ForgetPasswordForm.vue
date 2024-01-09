<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <AForm class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <AFormItem name="account" class="enter-x">
        <AInput
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </AFormItem>

      <AFormItem name="mobile" class="enter-x">
        <AInput size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </AFormItem>
      <AFormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </AFormItem>

      <AFormItem class="enter-x">
        <AButton type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
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
import LoginFormTitle from './LoginFormTitle.vue'
import { CountdownInput } from '/@/components/CountDown'
import { useI18n } from '/@/hooks/web/useI18n'
import { useLoginState, useFormRules, LoginStateEnum } from './useLogin'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  account: '',
  mobile: '',
  sms: '',
})

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD)

async function handleReset() {
  const form = unref(formRef)
  if (!form) return
  await form.resetFields()
}
</script>
