<script setup>
import { onMounted, reactive, ref } from 'vue';
import UserTemplateComponent from '@/components/User/UserTemplateComponent.vue';
import { PhoneOutlined, UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import axios from '@/plugins/axios'
const router = useRouter()
const regState = reactive({
    username: '',
    pwd: '',
    phone: '',
    validate: '',
    org_id: ''
})
const isSMSVerifyInputDisabled = ref(true)
const isSMSVerifyButtonDisabled = ref(false)
const waitSMSVerify = ref(0)
const doSMSVerifyWaiting = async() => {
    waitSMSVerify.value = 60
    let timer = setInterval(()=>{
        isSMSVerifyButtonDisabled.value = true
        waitSMSVerify.value--;
        if(waitSMSVerify.value == 0){
            clearInterval(timer)
            isSMSVerifyButtonDisabled.value = false
        }
    }, 1000)
}
const org_list = ref([])
const filterNum = (e) => {
    e.target.value = e.target.value.replace(/\D/g,'')
}
const fetchOrgList = () => {
    axios.get('/user/org_list').then(resp=>{
        org_list.value = resp.data.data.orgs
    })
}
const sms_verify = ref()
const fetchSMSVerifyCode = async() => {
    if(regState.phone != ''){
        axios.get('/user/sms_verify',{params: {phone: regState.phone}}).then(resp=>{
            sms_verify.value = resp.data.data.sms_verify_code
            isSMSVerifyInputDisabled.value = false
            doSMSVerifyWaiting()
            message.info('【SCR】您的验证码: '+sms_verify.value) //show fake verify code
        }).catch(err=>{
            console.log(err)
        })
    }else{
        message.info('请输入手机号码后重试')
    }
}
const doRegister = () => {
    axios.post('/user/register',regState).then(resp=>{
        if(resp.data.code==0){
            message.success('注册成功')
            router.push('/user/login')
        }
    }).catch(err=>{
        message.error('注册失败 '+err.response.data.msg)
        console.log(err)
    })
}
onMounted(()=>{
    fetchOrgList()
})
</script>

<template>
    <UserTemplateComponent>
        <template #content>
            <a-form
                :model="regState"
                name="login"
                class="login-form"
                layout="horizontal"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 20 }"
            >
                <a-form-item
                    label="用户名"
                    name="username"
                    :rules="[
                        {required: true, message: '请输入用户名'},
                        {pattern: new RegExp('^[a-zA-Z0-9_]{7,25}$','g'), message: '仅允许7-25位的半角数字、字母、下划线'}
                    ]"
                >
                    <a-input v-model:value="regState.username">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item
                    label="手机号码"
                    name="phone"
                    :rules="[
                        { required: true, message: '请输入手机号码' },
                        { pattern: new RegExp('^1[3456789]\\d{9}$','g'), message: '仅允许标准中国大陆移动电话号码（不加国际通信编号）' }
                    ]"
                >
                    <a-input v-model:value="regState.phone" :oninput="filterNum">
                        <template #prefix>
                            <PhoneOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item
                    label="验证码"
                    name="validate"
                    :rules="[
                        { required: true, message: '请输入验证码' },
                        { pattern: new RegExp('^\\d{6}$','g'), message: '验证码为6位数字' }
                    ]"
                >
                    <!-- <div style="gap: 8px;display: flex;flex-direction: row;"> -->
                    <div style="display: flex;flex-direction: row;justify-content: space-between;">
                        <a-input v-model:value="regState.validate" :disabled="isSMSVerifyInputDisabled" :maxlength="6" :oninput="filterNum">
                            <template #prefix>
                                <LockOutlined class="site-form-item-icon" />
                            </template>
                        </a-input>
                        <a-button :disabled="isSMSVerifyButtonDisabled" type="primary" @click="fetchSMSVerifyCode">
                            <span>获取验证码</span>
                            <span v-if="isSMSVerifyButtonDisabled">
                                ({{ waitSMSVerify }})
                            </span>
                        </a-button>
                    </div>
                        
                        
                    <!-- </a-input-group> -->
                        
                    <!-- </div> -->
                </a-form-item>
                <a-form-item
                    label="归属组织"
                    name="org_id"
                >
                    <a-select
                        v-model:value="regState.org_id"
                    >
                        <template v-for="org in org_list">
                            <a-select-option :value="org.oid">{{ org.name }}</a-select-option>
                        </template>
                    </a-select>
                </a-form-item>
                <a-form-item
                    name="pwd"
                    label="密码"
                    :rules="[
                        { required: true, message: '请输入密码'},
                        { pattern: new RegExp('^[a-zA-Z0-9_*#@!&$]{8,20}$','g'), message: '仅允许8-20位的半角数字、字母、下划线、部分特殊字符' }
                    ]"
                >
                    <a-input-password v-model:value="regState.pwd" :maxlength="18">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 4 }">
                    <!-- <a-button type="primary" html-type="submit">注册</a-button> -->
                    <a-button type="primary" @click="doRegister">注册</a-button>
                    <a-button style="margin-left: 10px" @click="router.push('/user/login')">已有账号？由此登录</a-button>
                </a-form-item>
            </a-form>
        </template>
    </UserTemplateComponent>
</template>

<style>

</style>