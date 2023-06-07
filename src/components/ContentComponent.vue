<script setup>
import { onMounted, ref } from 'vue'
import { useDataStore } from '@/stores/data.js'


onMounted(async() => {
  await getDatastore.getData();
  //console.log(getDatastore.data);
  cityData();
  getDatastore.totalData=getDatastore.data.length;
  dataContent.value=getDatastore.data;
})



const getDatastore = useDataStore();
const dataContent=ref(null);
let dataCity={};
const originData=ref(null);
const newData=ref(null);
const cityData=()=>{
  originData.value=getDatastore.data;

  //把原來的資料取出地址, 並賦予到newData內
  newData.value=originData.value.map(item => {
    return item.Address;
  });
  //console.log(newData.value);
  //把newData內的資料,取出前３個字
  //newData.value.substr(0, length)
  Object.keys(newData.value).forEach((key) => {
  //console.log(newData.value[key].substr(0, 3)); // 各縣市
  dataCity[key]=newData.value[key].substr(0, 3);
  getDatastore.city=dataCity;
  })

//console.log(dataCity);
originData.value.forEach(function(item,index){
        //console.log(Object.values(dataCity));
        //console.log(item);
        item.city=dataCity[index];
    });
originData.value=getDatastore.newdata;
}




</script>
<template>
  <h1 class="content">我是content</h1>
  <div class="container">
    <table class="table">
    <thead>
      <th>場館城市</th>
      <th>場館名稱</th>
      <th>場館地址</th>
      <th>如何使用</th>
      <th>聯絡方式</th>
      <th>場館照片</th>
    </thead>
    <tbody>
      <tr v-for="(item, key) in dataContent" :key="key">
        <td>{{ item.city }}</td>
        <td>{{ item.Name }}</td>
        <td>{{ item.Address }}</td>
        <td>{{ item.RentState }}</td>
        <td>{{ item.OperationTel }}</td>
        <td><img class="image" :src="item.Photo1" :alt="item.Name"></td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<style >
.content{
  color: #F37503;
}
.container{
  width: 100%;
}
.table{
  margin: 0 20px;
}
.table td, .table th{
  border-collapse: collapse;
  border-bottom:2px solid gray;
  padding: 10px 0;
}
td{
  text-align: center;
}
.image{
  width: 200px;
  height: 180px;
}
</style>