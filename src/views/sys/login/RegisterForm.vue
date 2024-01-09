<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <AForm class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <AFormItem name="account" class="enter-x">
        <AInput
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </AFormItem>
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
      <AFormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </AFormItem>
      <AFormItem name="confirmPassword" class="enter-x">
        <AInputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </AFormItem>

      <AFormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <ACheckbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </ACheckbox>
      </AFormItem>

      <AButton
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </AButton>
      <AButton size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </AButton>
    </AForm>
  </template>
</template>
<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'
import LoginFormTitle from './LoginFormTitle.vue'
import { StrengthMeter } from '/@/components/StrengthMeter'
import { CountdownInput } from '/@/components/CountDown'
import { useI18n } from '/@/hooks/web/useI18n'
import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  account: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  sms: '',
  policy: false,
})

const { getFormRules } = useFormRules(formData)
const { validForm } = useFormValid(formRef)

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

async function handleRegister() {
  const data = await validForm()
  if (!data) return
  console.log(data)
}
</script>
