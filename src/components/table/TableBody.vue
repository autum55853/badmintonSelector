<template>
  <div>
    <slot name="picture"></slot>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';

const prop=defineProps({
  tableHead: Array,
})
onMounted(()=>{
  console.log(prop);
})
</script>
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