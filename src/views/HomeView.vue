<script setup>

import HeaderComponent from '@/components/HeaderComponent.vue'
import ContentComponent from '@/components/ContentComponent.vue'

import { ref } from 'vue'
const getFilterData = ref(null);
const callback=(filterData)=>{
  //console.log(filterData);
  getFilterData.value=filterData;
}


</script>

<template>
  {{ getFilterData }}
  <header-component @select-data="callback">
  </header-component>
  <content-component :filter-data="getFilterData">
  </content-component>
</template>
