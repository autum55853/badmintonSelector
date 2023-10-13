<template>
  <div class="headerConent">
    <div class="title">
      <h1 class="header">全台羽球場館</h1>
      <span v-if="totalData"> 總共有{{ totalData }}筆資料 </span>
    </div>
    <div class="select">
      <el-select v-model="selectData.city" name="city" placeholder="請選擇城市">
        <el-option  v-for="(item, index) in citySelect" :key="index" :label="item" :value="item" />
      </el-select>
      <el-select @change="$emit('selectData',selectData)"  v-model="selectData.rent" name="rent" placeholder="是否可租借">
        <el-option v-for="item in rent" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive,defineEmits } from 'vue'
import { useDataStore } from '@/stores/data.js'

const getDatastore = useDataStore()
const citySelect = ref(null)
const totalData = ref(null)
/* onMounted(async() => {
  await getData();

}) */
onMounted(async () => {
  getDatastore.getCity()
  getData()
})
const getData = () => {
  //citySelect.value=getDatastore.city;
  totalData.value = getDatastore.totalData
  // if(citySelect.value){
  //   totalData.value=citySelect.value.length
  // }
  //console.log(getCities.value);
}
const rent = [
  { label: '所有資料', value: 'all' },
  { label: '可付費租借', value: 'canRent' },
  { label: '不可付費租借', value: 'cantRent' }
]

//v-model 接收Select資料
const selectData = reactive({
  city: '',
  rent: ''
})
defineEmits(['selectData','callback'])


</script>
<style>
.headerContent {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title span {
  color: blue;
  font-size: 20px;
  padding: 10px 20px;
  text-decoration: underline;
}
.header {
  color: #58d68d;
}
.select {
  display: flex;
}
</style>
