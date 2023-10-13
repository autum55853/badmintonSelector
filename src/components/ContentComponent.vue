<template>
  {{ props.filterData }}
  <div class="container">
    <el-table
      v-loading="loading"
      element-loading-text="please wait for loading"
      :data="tableData"
      class="table"
      max-height="400"
    >
      <el-table-column
        v-for="(item, index) in tableHead"
        :key="index"
        :prop="item.value"
        :label="item.label"
      />
      <el-table-column prop="Photo1" label="場館照片">
        <template v-slot="scope">
          <el-image class="image" :src="scope.row.Photo1"> </el-image>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <!-- <PaginationPages :state="state" :dataLength="dataLength"></PaginationPages> -->
      <el-pagination
        class="page_position"
        @current-change="handleCurrentChange"
        background
        v-model:current-page="state.currentPage"
        layout="prev, pager, next"
        :total="dataLength"
        :page-size="state.sizePage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script setup>
//import PaginationPages from '@/components/PaginationPages.vue'

import { onMounted, ref, reactive,useAttrs,watch } from 'vue'
import { useDataStore } from '@/stores/data.js'


const attrs = useAttrs();
//const propFilterData = attrs.onFilterData;

const props=defineProps(['filterData']);
const propData=ref(props.filterData)
const transformPropData=[];
transformPropData.push(propData);

const tableHead = [
  { label: '場館縣市', value: 'city' },
  { label: '場館名稱', value: 'Name' },
  { label: '場館地址', value: 'Address' },
  { label: '使用說明', value: 'RentState' },
  { label: '聯絡電話', value: 'OperationTel' }
]

const loading = ref(true)
const getDatastore = useDataStore()
const dataContent = ref(null)
const dataLength = ref(0)
onMounted(async () => {
  await getDatastore.getData()
  loading.value = false
  cityData()
  getPageData()
  dataContent.value = getDatastore.data
  //得到資料總數
  getDatastore.totalData = dataContent.value.length
  dataLength.value = getDatastore.totalData
  getTableData()
})

const originData = ref(null)
const newData = ref(null)
const selectCity = ref([])
const cityData = () => {
  originData.value = getDatastore.data

  //把原來的資料取出地址, 並賦予到newData內
  newData.value = originData.value.map((item) => {
    return item.Address
  })

  let dataTableCity = {}
  Object.keys(newData.value).forEach((key) => {
    // 取得地址前三個字為各縣市
    dataTableCity[key] = newData.value[key].substr(0, 3)
  })

  //取得不重複的城市資料, 存到store裡面給HeadComponent使用
  selectCity.value = Object.values(dataTableCity).filter((item, index) => {
    return Object.values(dataTableCity).indexOf(item) === index
  })
  getDatastore.city = selectCity.value
  //console.log(selectCity.value);
  //將各縣市跑回圈塞回原APIdata
  originData.value.forEach(function (item, index) {
    //console.log(Object.values(dataCity));
    item.city = dataTableCity[index]
  })
}

//Pagination會用到的參數
const state = reactive({
  currentPage: 1, //目前頁面數
  sizePage: 20, //單頁有幾筆資料
  total: dataLength,
  minData: 0,
  maxData: 0
})
const getPageData = () => {
  state.minData = state.currentPage * state.sizePage - state.sizePage + 1
  state.maxData = state.currentPage * state.sizePage
}
let tableData = ref([])
//前端限制Table 顯示的row數量
const getTableData = () => {
  return dataContent.value.forEach((item, index) => {
    const num = index + 1
    if (num >= state.minData && num <= state.maxData) {
      tableData.value.push(item)
    }
  })
};
const handleCurrentChange = (e) => {
  state.currentPage = e
  getPageData()
  tableData.value = [] //須將原資料清除
  getTableData()
};
const filter=()=>{
  filterData.forEach((el)=>{
    console.log(el);
  })
}
watch(
  () => propData,
  (newValue, oldValue) => {
    // Note: `newValue` will be equal to `oldValue` here
    // *unless* state.someObject has been replaced
    console.log(newValue);

    // filter();
  },
  { deep: true }
)

</script>

<style>
.container {
  width: 100%;
  margin: 0 auto;
  max-height: 300px;
}
.table {
  margin: 30px auto;
}
.table td,
.table th {
  border-collapse: collapse;
  border-bottom: 2px solid gray;
  padding: 10px 0;
}
td {
  text-align: center;
}
.pagination {
  margin: 0 auto;
}
</style>
