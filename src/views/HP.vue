<script setup>
import { onMounted, ref } from 'vue';
import { CaretDownOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const bg = ref(0.3)
const isLogin = ref(false)
const go = ()=>{
    if(isLogin.value){
        router.push('/system')
    }else{
        console.log('no login')
        router.push({
            path: '/user/login',
            query: {
                from: 'homepage'
            }
        })
    }
}
onMounted(()=>{
    setTimeout(() => {
        bg.value = 0.65;
    }, 1000);
})
</script>

<template>
    <div id="hp_container">
        <div id="hp_bg"/>
        <div id="hp_bgcover" :style="{opacity: bg}"/>
        <!-- <div id="hp"> -->
        <div id="hp_intro">
            <div id="hp_intro_content">
                <div id="hp_intro_banner">
                    <div class="hp_intro_banner_x">
                        <span>数据处理中心</span>
                    </div>
                    <div class="hp_intro_banner_m">
                        <div>高效数据脱敏，避免隐私泄露。</div>
                        <div>依托强力引擎，提供高效体验。</div>
                    </div>
                </div>
                <button class="hp_jump_button" @click="go">Enter</button>
            </div>
        </div>
        <div id="hp_arrow" :style="{textAlign: 'center'}">
            <CaretDownOutlined />
        </div>
    </div>
</template>

<style>
#hp_container{
    height: 100%;
    overflow: hidden;
}
#hp_bg,#hp_bgcover{
    position: fixed;
    top: -5%;
    left: -5%;
    width: 110%;
    height: 110%;
    padding: 10%;
}
#hp_bg{
    z-index: 1;
    background: center / cover no-repeat url('@/assets/img/hp_bg.png') ;
    filter: blur(0.2rem);
}
#hp_bgcover{
    z-index: 2;
    background-color: #000;
    transition: all 2.5s ease;
}
#hp_intro{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 999;
}
#hp_intro_banner>*{
    margin-bottom: 35px;
    color: #fff;
}
#hp_intro_content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80%;
    width: 80%;
}
.hp_intro_banner_x,.hp_intro_banner_m{
    text-align: center;
}
.hp_intro_banner_x{
    font-size: 6vw;
    font-weight: bold;
}
.hp_intro_banner_m{
    font-size: 1.5vw;
    font-weight: lighter;
}
.hp_intro_banner_m>div{
    margin-bottom: 15px;
}
#hp_arrow{
    z-index: 999;
    position: fixed;
    left: 50%;
    bottom: 35px;
    color: #fff;
    animation: move 3s ease-in-out infinite;
}
@keyframes move {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
}
.hp_jump_button{
    display: block;
    background: none;
    border: 1px solid white;
    width: 15vw;
    padding: 1vw 1.2vw;
    border-radius: 15px;
    color: #fff;
    font-size: 1vw;
    backdrop-filter: blur(2px);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.0);
    transition: box-shadow 0.5s ease;
    cursor:pointer;
}
.hp_jump_button:hover{
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}
</style>
