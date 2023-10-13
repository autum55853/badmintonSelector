import { defineStore } from 'pinia'
import axios from 'axios'
/* ref()s become state properties
computed()s become getters
function()s become actions */

export const useDataStore = defineStore('dataList', {
  state:()=>({
    //https://iplay.sa.gov.tw/api/GymSearchAllList?$format=application/json;odata.metadata=none&Keyword=羽球&City=&GymType=羽球&Latitude=&Longitude=
    gymUrl:'https://iplay.sa.gov.tw/api/GymSearchAllList?$format=application/json;odata.metadata=none&Keyword=羽球&City=&GymType=羽球&Latitude=&Longitude=',
    cityUrl:'http://api.opencube.tw/twzipcode/get-citys',
    totalData:0,
    data:[],
    newData:[],
    city:[],
  }),
  actions:{
    async getData() {
      this.res=await axios.get(this.gymUrl)
      .then((response)=>{
        //console.log(response.data);
        this.data=response.data;
      })
      .catch((error)=>console.log(error));
    },
    async getCity(){
      this.res=await axios.get(this.cityUrl,{
        headers: {"Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
      },
        withCredentials: true,
        credentials: 'same-origin',

      })
      .then((response)=>{
        //console.log(response.data);
        this.ciy=response.data;
      })
      .catch((error)=>console.log(error));
    },
    }
  },
)