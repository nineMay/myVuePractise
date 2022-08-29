
<template>
<transition name="slide-up">
<Lockscreen v-if="isLock&&isMouted&&$route.name!=LOGIN_NAME "></Lockscreen>
</transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Lockscreen from './lockscreen.vue';
import {useLockscreenStore} from '@/store/modules/lockscreen';
import { useRoute } from 'vue-router';
import { LOGIN_NAME } from '@/router/constant';

const lockscreenStore=useLockscreenStore();
const route = useRoute();
const isLock=computed(()=>lockscreenStore.isLock);
const lockTime=computed(()=>lockscreenStore.lockTime);
//ref被用来给元素或子组件注册引用信息，引用信息会注册在父组件的$refs对象上
const isMouted=ref(false);

let timer;

const timekeeping=()=>{
	/** 终止定时器 */
	clearInterval(timer);
	if(route.name===LOGIN_NAME||isLock.value){
		return ;
	}
	lockscreenStore.setLock(false);
	lockscreenStore.setLockTime();
	timer=setInterval(()=>{
		/** 锁屏倒计时递减 */
		lockscreenStore.setLockTime(lockTime.value-1);
		if(lockTime.value<=0){
			/** 设置锁屏 */
			lockscreenStore.setLock(true);
			return clearInterval(timer);
		}
	},1000)
};

// DOM挂载完毕
onMounted(() => {
	/** 添加事件监听 */
	document.addEventListener('mousedown',timekeeping);
	setTimeout(() => {
		isMouted.value=true;
	});
});

// 销毁完毕
onUnmounted(() => {
	// 移除由 addEventListener() 方法添加的事件
	document.removeEventListener('mousedown',timekeeping);
}),


</script>

<style lang="less" scoped>

</style>

