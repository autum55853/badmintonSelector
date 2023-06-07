<script setup>
import { onMounted, ref,watch } from 'vue'
import { useDataStore } from '@/stores/data.js'


const getDatastore = useDataStore();
const citySelect=ref(null);
const totalData=ref(null);
/* onMounted(async() => {
  await getData();

}) */
onMounted(()=>{
  getData();

})
const getData=()=>{
  citySelect.value=getDatastore.data;
  console.log(citySelect.value.length);
  if(citySelect.value){
    totalData.value=citySelect.value.length
  }
}



</script>
<template>
  <div class="headerConent">
    <div class="title">
      <h1 class="header">全台羽球場館</h1>
      <span>總共有{{totalData}}筆資料</span>

    </div>
    <div class="select">
      <select name="city" id="city">
      <option value="請選擇城市">請選擇城市</option>
      <option value="台北市">台北市</option>
      <option value="新北市">新北市</option>
      <option value="桃園市">桃園市</option>
    </select>
    <select name="isOpen" id="isOpen">
      <option value="可否付費租借">可否付費租借</option>
      <option value="可付費租借">可付費租借</option>
      <option value="不開放租借">不開放租借</option>
    </select>
    </div>
  </div>

</template>
<style >
.headerContent{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title span{
  color: blue;
  font-size: 20px;
  padding: 10px 20px;
  text-decoration: underline;
}
.header{
  color: #58D68D;
}
.select{
  display: flex;
}
</style>