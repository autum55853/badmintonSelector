import { defineStore } from 'pinia'
import axios from 'axios'

/* ref()s become state properties
computed()s become getters
function()s become actions */

export const useDataStore = defineStore('dataList', {
  state:()=>({
    //https://iplay.sa.gov.tw/api/GymSearchAllList?$format=application/json;odata.metadata=none&Keyword=羽球&City=&GymType=羽球&Latitude=&Longitude=
    url:'https://iplay.sa.gov.tw/api/GymSearchAllList?$format=application/json;odata.metadata=none&Keyword=羽球&City=&GymType=羽球&Latitude=&Longitude=',
    totalData:0,
    data:[],
    newData:[],
    dataCity:{},
    city:{},
    res:null,
  }),
  actions:{
    async getData() {
      this.res=await axios.get(this.url)
      .then((response)=>{
        //console.log(response.data);
        this.data=response.data;
      })
      .catch((error)=>console.log(error));
    },
  },
  }
)