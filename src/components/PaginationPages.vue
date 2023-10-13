<template>
  <div>分頁</div>
  <el-pagination
    background
    page-size="[10,30,50]"
    layout="prev, pager, next,total,sizes"
    :total="state"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>
<script setup>

import { ref } from 'vue'

const props=defineProps({
  dataLength:Number,
  state:Object,
})

let page=ref(props.dataLength)
let state=ref(props.state)
//改變頁碼
const handleCurrentChange=(e)=>{
  page.value=e
}

//改變頁數限制
const handleSizeChange=(e)=>{
  state.value.maxPage=e
}



</script>

