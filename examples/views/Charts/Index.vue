<template>
  <div class="chart-view">
    chart deoms1 - 敏捷平台
    <div class="demos">
      <InfiniteChart
        :chartData='quickData'
        :scale="[
          {
            name:'count',
            config:{
              min:0,
              nice:true
            }
          },
          {
            name:'date',
            config:{
              range:[0,1],
              tickCount: 6
            }
          }
        ]"
      >
        <InfiniteChartToolTips
          visable=true
          :crosshairs="{
            type: 'x',
            follow: true,
            line: {
              style: {
                stroke: 'rgba(255,118,53,0.4)',
                lineDash: [4]
              }
            }
          }"
          :showCrosshairs="true"
          :padding="[40]"
          :showTitle='false'
          :itemTplFunc="()=>{
            return '<div>{title}:{value}</div>'
          }"
          :domStyles="{
            'g2-tooltip':{
              backgroundColor: 'rgba(0,0,0, .5)',
              color: '#fff',
              height: '28px',
              display:'flex',
              alignItems: 'center'
            },
            'g2-tooltip-title': {
              margin: '0'
            }
          }"
        />
        <InfiniteChartLine :size='2' position="date*count" color="rgb(255,118,53)" />
        <InfiniteChartAxis name='count'
          :grid="{
            line:{
              style:{
                stroke: '#999',
                lineWidth: 1
              }
            }
          }"
         unlock />
      </InfiniteChart>
    </div>
    god
    <div class="demos">
      <InfiniteChart
        :chartData='godData'
      >
        <InfiniteChartToolTips
          visable=true
          lock
          :crosshairs="{
            type: 'x',
            follow: true,
            line: {
              style: {
                stroke: 'rgba(255,118,53,0.4)',
                lineDash: [4]
              }
            }
          }"
          :showCrosshairs="true"
          :padding="[40]"
          :showTitle='false'
          :itemTplFunc="()=>{
            return '<div>{title}:::::{value}</div>'
          }"
          :domStyles="{
            'g2-tooltip':{
              backgroundColor: 'rgba(0,0,0, .5)',
              color: '#fff',
              height: '28px',
              display:'flex',
              alignItems: 'center'
            },
            'g2-tooltip-title': {
              margin: '0'
            }
          }"
        />
        <InfiniteChartLine :size='2' position="date*count" color="#999" />
        <InfiniteChartAxis name='date'
          :title="{
            offset: 10,
            style: {
              color: '#f00',
            }
          }"
          :grid="{
            line: {
              style:{
                stroke: '#000',
                lineWidth: 10
              }
            }
          }"
         unlock />
         <InfiniteChartAxis name='count'
          :title="{
            offset: 10,
            style: {
              color: '#f00',
            }
          }"
          :grid="{
            line:{
              style:{
                stroke: '#f00',
                lineWidth: 10
              }
            }
          }"
         unlock />
      </InfiniteChart>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Charts',
  data () {
    return {
      quickData: [{
        date: '1月',
        count: 123
      }, {
        date: '2月',
        count: 39
      }, {
        date: '3月',
        count: 581
      }, {
        date: '4月',
        count: 412
      }, {
        date: '5月',
        count: 905
      }, {
        date: '6月',
        count: 1099
      },
      {
        date: '7月',
        count: 1488
      }, {
        date: '8月',
        count: 937
      }, {
        date: '9月',
        count: 2179
      }, {
        date: '10月',
        count: 377
      }, {
        date: '11月',
        count: 1520
      }, {
        date: '12月',
        count: 967
      }
      ],
      godData: [{
        count: 587,
        date: '01.01'
      }, {
        count: 599,
        date: '01.08'
      }, {
        count: 600,
        date: '01.15'
      }, {
        count: 500,
        date: '01.20'
      }]
    }
  }
}
</script>

<style>

</style>

containerTpl='
          <div class="g2-tooltip">
            <div class="g2-tooltip-title">Language</div>
            <ul class="g2-tooltip-list">
              <li class="g2-tooltip-list-item">
                <span class="g2-tooltip-marker"></span>
                <span class="g2-tooltip-name">{name}</span>:<span class="g2-tooltip-value">70</span>
              </li>
              <li class="g2-tooltip-list-item">
                <span class="g2-tooltip-marker"></span>
                <span class="g2-tooltip-name">b</span>:<span class="g2-tooltip-value">50</span>
              </li>
            </ul>
          </div>
          '
