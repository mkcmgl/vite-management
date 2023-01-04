<template>
    <el-radio-group v-model="selectLabel"  @change="dayChange">
    
        <el-radio-button label="sale_">销量</el-radio-button>
    
        <el-radio-button label="_money">销售额</el-radio-button>
    
    
    
    </el-radio-group>
    
    <el-select  v-model="selectDay" class="m-2" placeholder="Select" @change="dayChange">
    
        <el-option v-for="(item ,index) in options" 
        :key="index" :label="item.name" :value="item.value" />
    
    </el-select>
    
    <div id="pie" style="width: 100%;height:50%">
    
    
    
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs, onMounted, watch } from 'vue'
import * as echarts from "echarts"

const props = defineProps < {
    data: {}[]
} > ()

const state = reactive({
    selectLabel: 'sale_',
    selectDay: 'today',
    options: [
        { name: '今天', value: 'today' },
        { name: '昨天', value: 'yesterday' },
        { name: '前三天', value: 'three_day' },
        { name: '前七天', value: 'seven_day' },
    ]
})
const { selectLabel, selectDay, options } = toRefs(state)


const dayChange=()=>{
    initPie()
}

var myChart : echarts.ECharts
const initPie = () => {
    let key=''
    if(selectLabel.value==='_money'){
        key=selectDay.value+selectLabel.value
    }else{
        key=selectLabel.value+selectDay.value
    }
    const arr = props.data.map((item: { [key: string]: string; }) => 
    ({ value: item[key], name: item.name }))
    if(!myChart){

        myChart = echarts.init(document.getElementById('pie') as HTMLElement)
    }
    const option = {
        // tooltip: {
        //     trigger: 'item'
        // },
        legend: {
            right: 10,
            top: 20,
            width: 300,
            height: 100,
            orient: 'vertical'
        },
        series: [{
            // name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            center: ['25%', "45%"],
            // label: {
            //     show: true,
            //     // position: 'center'
            // },
            // emphasis: {
            //     // label: {
            //     //     show: true,
            //     //     // fontSize: 40,
            //     //     // fontWeight: 'bold'
            //     // }
            // },
            // labelLine: {
            //     show: true,

            // },
            data: arr
        }]
    };
    myChart.setOption(option);

}
watch(() => props.data, () => {

    initPie()
})

onMounted(() => {

});

</script>

<style lang="less" scope>
.el-select.m-2 {
    float: right;
    margin-right: 20px;
}
</style>