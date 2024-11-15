<script setup>
import axios from '@/plugins/axios';
import blobHandler from '@/plugins/blobHandler';
import byteFormat from '@/plugins/byteFormat.js'
import { onMounted, reactive, ref } from 'vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import mime from 'mime';
const data = ref()
const getList = async()=>{
    isTableLoading.value = true
    var data_ = {name: table.searchFileName, current: table.current, size: table.size}
    axios.post('/file/getList',data_).then(resp=>{
        data.value = resp.data;
        // table.current = data.value.current;
        table.total = data.value.total;
        table.pages = data.value.pages;
        table.size = data.value.size;
        table.records = data.value.records;
        isTableLoading.value = false
    }).catch(err=>{
        console.warn(err)
        isTableLoading.value = false
    })
}
const fetchFile = async(id, fileName) => {
    isTableLoading.value = true
    await axios.get('/file/download', { responseType: 'blob', params: {id: id} }).then(resp=>{
        blobHandler(resp.data, fileName)
        isTableLoading.value = false
    }).catch(err=>{
        isTableLoading.value = false
        console.log(err)
    })
}
const uploadFile = async(e) => {
    console.log('upload event',e)
    if(e.file.status=='done'){
        fileList.value = []
        await getList()
    }
}
const deleteFile = async(id) => {
    console.log(id)
    await axios.post('/file/remove', {id: id}).finally(()=>{
        getList()
    });
}
const fileList = ref([])
const uploadAddr = ref('/api/file/upload')
const table = reactive({
    current: 1,
    total: 0,
    size: 20,
    pageSizeOptions: ['5', '10', '20', '50', '100'],
    pages: 0,
    searchFileName: '',
    records: [],
    columns: [
        {
            title: '序号',
            width: '7.5%',
            key: 'no'
        },
        {
            title: '文件标志码',
            dataIndex: 'file_id',
            key: 'file_id',
            width: '22.5%',
        },
        {
            title: '文件名',
            dataIndex: 'file_name',
            key: 'file_name',
            width: '25%'
        },
        {
            title: '文件大小',
            dataIndex: 'file_size',
            key: 'file_size',
            width: '15%',
            customRender: ({text, record, index, column})=> `${byteFormat(text)}`
        },
        {
            title: '操作',
            key: 'operation',
            width: '30%',
            customRender: ({text, record, index, column})=> `${index}`
        }
    ],
})
const isTableLoading = ref(false)
const onTableChange = async(e) => {
    table.current = e.current
    table.size = e.pageSize
    console.log(e)
    await getList()
}
const onTableSearch = async(e) => {
    table.searchFileName = e
    await getList()
}
const supportFileTypeList = ref([])
const fetchSupportFileTypeList = async() => {
    axios.get('/file/support_types').then(resp=>{
        supportFileTypeList.value = resp.data.data
    }).catch(err=>{
        supportFileTypeList.value = ['Fetch Failed']
        console.log(err)
    })
}
onMounted(async()=>{
    await fetchSupportFileTypeList()
    await getList()
})
</script>

<template>
    <a-row>
        <a-col :span="16">
            <a-card title="文件列表">
                <a-space direction="vertical" :style="{width: '100%'}" size="middle">
                    <div :style="{display: 'flex', justifyContent: 'space-between'}">
                        <a-space size="middle">
                            <a-upload
                                v-model:file-list="fileList"
                                :action="uploadAddr"
                                @change="uploadFile"
                                :accept="supportFileTypeList.join(',')"
                            >
                                <a-button type="primary">上传</a-button>
                            </a-upload>
                        </a-space>
                        <a-space size="middle">
                            <a-popover title="支持的文件类型">
                                <template #content>
                                    <template v-for="i in supportFileTypeList">
                                        {{ '.' + mime.getExtension(i) + ' ' }}
                                    </template>
                                </template>
                                <InfoCircleOutlined />
                            </a-popover>
                            <a-input-search style="width: 20vw" placeholder="搜索文件……" enter-button @search="onTableSearch" />
                        </a-space>
                    </div>
                    <div>
                        <a-table
                            :columns="table.columns"
                            :dataSource="table.records" 
                            :scroll="{  scrollToFirstRowOnChange: true, y: '45vh' }"
                            :pagination="{
                                current: table.current,
                                pageSize: table.size,
                                total: table.total,
                                pages: table.pages,
                                showTotal: ((total) => {
                                    return `共 ${total} 个文件`;
                                }),
                                pageSizeOptions: table.pageSizeOptions,
                                showSizeChanger: true,
                                position: ['bottomCenter'],
                            }"
                            @change="onTableChange"
                            :loading="isTableLoading"
                        >
                            <template #bodyCell="{ column, record, index }">
                                <template v-if="column.key === 'operation'">
                                    <a-space>
                                        <a-button type="primary" @click="fetchFile(record.file_id, record.file_name)">下载</a-button>
                                        <a-button danger @click="deleteFile(record.file_id)">删除</a-button>
                                    </a-space>
                                </template>
                                <template v-if="column.key === 'no'">
                                    {{ (table.current - 1) * table.size + index + 1 }}
                                </template>
                            </template>
                            <template #emptyText>
                                <div class="table_empty">
                                    <a-empty/>
                                </div>
                            </template>
                        </a-table>
                    </div>
                </a-space>
            </a-card>
        </a-col>
        <a-col :span="7" :offset="1">
            <div>
                <a-carousel
                    class="carousel_frame"
                    autoplay
                    effect="fade"
                    :centerMode="false"
                >
                    <div class="carousel_item">
                        <img src="@/assets/img/system_carousel/1.png"/>
                    </div>
                    <div class="carousel_item">
                        <img src="@/assets/img/system_carousel/2.png"/>
                    </div>
                    <div class="carousel_item">
                        <img src="@/assets/img/system_carousel/3.png"/>
                    </div>
                    <div class="carousel_item">
                        <img src="@/assets/img/system_carousel/4.png"/>
                    </div>
                </a-carousel>
            </div>
        </a-col>
    </a-row>
    
</template>

<style scoped>

:deep(.ant-table-body){
    height: 45vh;
}
.table_empty{
    height: calc(45vh - 32px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.carousel_item{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.carousel_item > img{
    width: 100%;
    height: auto;
    /* height: 100%; */
}
:deep(.slick-track){
    display: flex;
    align-items: center;
    /* background: #eee; */
}
</style>
