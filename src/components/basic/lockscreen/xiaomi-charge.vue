<template>

	<div class="xiaomi-charge">
		<div v-for="i in 3" :key="i" class="outer">
		<div class="circle" :style="{transform:`scale(${1.01-0.04*(i-1)})`}"></div>
	</div>
	</div>

</template>


<script   lang='ts'>
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import  type{ Battery } from '@/hooks/useBattery';
  export default defineComponent({
	name:'XiaomiCharge',
	props:{
		battery:{
			//电池对象
			type:Object as PropType<Battery>,
				default: () => ({}),
		}
	}
});
</script>


<style lang='less' scoped>

</style>