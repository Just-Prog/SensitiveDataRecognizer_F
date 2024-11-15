<script setup>
import { FileTextOutlined, HomeTwoTone, InfoCircleTwoTone  } from '@ant-design/icons-vue'
import { onMounted, ref , reactive } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { result as UAParser } from '@/plugins/ua-parser'
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import axios from '@/plugins/axios'
const router = useRouter()
const route = useRoute()
const userdata = storeToRefs(useUserStore())
const username = userdata.username
const sider_select = ref([route.fullPath])
const uid = userdata.uid
const org = userdata.org
const avatar = userdata.avatar  
const ipaddr = userdata.ip_addr
const ua = ref(UAParser)
const time = ref(new Date().toLocaleString())
const watermark = reactive({
    content: [
                username.value+'\xa0('+uid.value+')',
                org.value,
                time.value,
                ua.value.browser.name + '\xa0' + ua.value.browser.version + '\xa0on\xa0' + ua.value.os.name + '\xa0' + ua.value.os.version + '\xa0(' + ipaddr.value + ')'
            ],
    gap: [45,110],
    offset: [-10,0],
    rotate: -15,
    font: {
        fontFamily: ['PingFangSC-Medium', 'Source Han Sans CN', 'Microsoft YaHei', 'sans-serif'],
        color: 'rgba(0,0,0,.15)'
    }
})
const logout = async() => {
    axios.delete('/user/logout').then(resp=>{
        useUserStore().logout()
        document.cookie = ''
        router.push({
            path: '/user/login',
            query: {
                from: 'logout'
            }
        })
    }).catch(err=>{
        console.log(err)
    })
}
const updateUserInfo = async()=>{
    axios.post('/user/verify').then(resp=>{
        userdata.username.value = resp.data.data.username
        userdata.uid.value = resp.data.data.uid
        userdata.org.value = `${resp.data.data.org_info.org_name} (${resp.data.data.org_info.org_id})`
        userdata.avatar.value = resp.data.data.avatar
    })
}
onMounted(async()=>{
    await updateUserInfo()
    if(ua.value.device.model != undefined){
        watermark.content.push('DEVICE：'+ua.value.device.vendor+'\xa0'+ua.value.device.model)
    }
})
</script>

<template>
    <a-layout id="MainView"> 
        <a-layout-header id="MainHeader">
            <div id="nav">
                <RouterLink to='/'>
                    <div class="logo"/>
                </RouterLink>
                <span>文件信息脱敏系统</span>
            </div>
            <div id="nav_r">
                <a-dropdown>
                    <a-space>
                        <a-avatar :src="avatar" :size="40"/>
                        <span :style="{fontSize: '16px',fontWeight: 'bold'}">{{ userdata.username }}</span>
                    </a-space>
                    
                    <template #overlay>
                        <a-menu>
                            <RouterLink to='/'>
                                <a-menu-item>主页</a-menu-item>
                            </RouterLink>
                            <span @click="logout">
                                <a-menu-item>退出登录</a-menu-item>
                            </span>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </a-layout-header>
        <a-layout id="MainContent">
            <a-layout-sider id="MainSider">
                <a-menu
                id="MainSider_Menu"
                mode="inline"
                :style="{ height: '100%', borderRight: 0}"
                v-model:selectedKeys="sider_select"
                >
                    <RouterLink to="/system/home">
                        <a-menu-item :key="'/system/home'">
                            <HomeTwoTone />
                            <span>首页</span>
                        </a-menu-item>
                    </RouterLink>
                    <RouterLink to="/system/file">
                        <a-menu-item :key="'/system/file'">
                            <FileTextOutlined />
                            <span>文件管理</span>
                        </a-menu-item>
                    </RouterLink>
                    <RouterLink to="/system/about">
                        <a-menu-item :key="'/system/about'">
                            <InfoCircleTwoTone />
                            <span>关于</span>
                        </a-menu-item>
                    </RouterLink>
                </a-menu>
            </a-layout-sider>
            <a-layout-content>
                    <a-watermark
                        class="antd-wm"
                        v-bind="watermark"
                    >
                <div id="Main">
                        <slot name="content"/>
                </div>
                    </a-watermark>
            </a-layout-content>
        </a-layout>
        <a-layout-footer id="MainFooter">
            Sensitive Data Recognizer @Xiamen Torch Hi-Tech IDZ
        </a-layout-footer>
    </a-layout>
</template>

<style scoped>
.logo{
    width: 80px;
    height: 45px;
    background: url('@/assets/logo.png') center / cover no-repeat;
}
#MainView{
    min-height: 100vh;
    max-height: 100vh;
    background: #fff;
}
#MainContent{
    /* height: calc(100vh - 64px); */
    height: 100%;
}
#MainHeader{
    background: rgb(240,240,240);
}
#nav{
    float: left;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 24px;
    font-size: 125%;
    font-weight: bold;
}
#nav_r{
    height: 100%;
    float: right;
    display: flex;
    align-items: center;
}
#MainSider{
    background: rgb(225,225,225);
    border-bottom: 2px solid rgb(235,235,235);
    border-top: 2px solid rgb(235,235,235);
}
#MainSider_Menu>a{
    color: unset
}
#Main{
    padding: 15px;
    overflow: auto;
    /* scrollbar-width: none; */
    /* overflow-y: scroll; */
    min-height: 100%;
    height: 100%;
}
#MainFooter{
    text-align: center;
    background: none;
}
:deep(.antd-wm){
    height: 100%;
}
</style>
