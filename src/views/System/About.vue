<script setup>

</script>

<template>
    <div id="about_main">
        <div class="about_item">
            <div class="logo" :style="{width: '200px', objectFit: 'contain'}">
                <img src="@/assets/logo.png" width="100%" height="100%"/>
            </div>
            
        </div>
        <div class="about_item">
            <h1>文件信息去敏处理中心</h1>
            <h5>©2024</h5>
            <h5>@厦门火炬高新产业园 Xiamen Torch Hi-Tech IDZ</h5>
            <h5>@集美大学诚毅学院 Chengyi University College, Jimei University</h5>
            <br/>
            <h5>炬火种·燃新薪 - 2024厦门火炬高新区高新专业新星挑战大赛</h5>
            <h5><a href="https://challenge.xmtorch.cn/">https://challenge.xmtorch.cn/</a></h5>
        </div>
    </div>
</template>

<style scoped>
#about_main{
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10vw;
}
.about_item{
    font-size: 18px;
}
@media screen and (max-width: 1096px) {
    #about_main{
        gap: 5vh;
        flex-direction: column;
    }
    .about_item{
        font-size: 12px;
        text-align: center;
    }
}
</style>
