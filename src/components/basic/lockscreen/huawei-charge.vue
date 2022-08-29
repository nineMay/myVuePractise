<template>

	<div class="xiaomi-charge">
		<div v-for="i in 3" :key="i"></div>
	</div>

</template>


<script  lang='ts'>
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  import type { Battery } from '@/hooks/useBattery';

export default defineComponent({
    name: 'HuaweiCharge',
    // props: ['batteryStatus', 'battery', 'calcDischargingTime'],
    props: {
      battery: {
        // 电池对象
        type: Object as PropType<Battery>,
        default: () => ({}),
      },
      calcDischargingTime: {
        // 电池剩余时间可用时间
        type: String,
        default: '',
      },
      batteryStatus: {
        // 电池状态
        type: String,
        validator: (val: string) => ['充电中', '已充满', '已断开电源'].includes(val),
      },
    },
  });
</script>


<style lang='less' scoped>

</style>