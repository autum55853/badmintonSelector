
<template>
  <el-table
    :dataContent="prop"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >


  </el-table>
</template>
<script setup>
const prop=defineProps({
  dataContent: Array,
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