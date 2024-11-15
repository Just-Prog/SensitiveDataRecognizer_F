<script setup>
import { onMounted, ref } from 'vue';
import UserTemplateComponent from '@/components/User/UserTemplateComponent.vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message, notification } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import axios from '@/plugins/axios';
const user_p = useUserStore()
const user = storeToRefs(user_p)
const route = useRoute()
const router = useRouter()
const loginState = ref({
    username: '',
    pwd: ''
})

const loginCheck = () => {
    axios.post('/user/is_logged').then(resp=>{
        message.info('已登录，跳转中')
        setTimeout(()=>{
            router.push('/system')
        },500)
    }).catch(err=>{
        console.log(err)
        if(err.status == '403' || err.status == '404' ){
            message.info(`请登录`);
            user_p.logout()
            document.cookie = ''
        }else{
            message.info(`发生了一般错误 ${err.code}`)
        }
    })
}

const loginConfirm = () => {
    axios.post('/user/login', loginState.value).then(resp=>{
        user.username.value = resp.data.data.username
        user.uid.value = resp.data.data.uid
        user.org.value = `${resp.data.data.org_info.org_name} (${resp.data.data.org_info.org_id})`
        user.avatar.value = resp.data.data.avatar
        user.ip_addr.value = resp.data.data.ip_addr
        message.info('登录成功')
        router.push('/system')
    }).catch(err=>{
        message.warn(`登录出现问题 ${err.response.status} ${err.response.data.msg}`)
        if(err.response.status == 400){
            message.warn('请检查用户名与密码是否正确。')
        }else{
            message.warn('发生了其他问题，请稍等')
        }
    })
}

onMounted(()=>{
    loginCheck()
})
</script>

<template>
    <UserTemplateComponent>
        <template #content>
            <a-form
                :model="loginState"
                name="login"
                class="login-form"
                layout="horizontal"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 20 }"
            >
                <a-form-item
                    label="用户名"
                    name="username"
                    :rules="[{ required: true, message: '请输入用户名' }]"
                >
                    <a-input v-model:value="loginState.username">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item
                    name="pwd"
                    label="密码"
                    :rules="[{ required: true, message: '请输入密码'}]"
                >
                    <a-input-password v-model:value="loginState.pwd">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 4 }">
                    <!-- <a-button type="primary" html-type="submit">登录</a-button> -->
                    <a-button type="primary" @click="loginConfirm">登录</a-button>
                    <a-button style="margin-left: 10px" @click="router.push('/user/register')">没有账号？由此注册</a-button>
                </a-form-item>
            </a-form>
        </template>
    </UserTemplateComponent>
</template>

<style>

</style>