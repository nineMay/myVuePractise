<template>
	<!-- v-on可以用@代替，v-bind用：代替 -->
	<!-- v-on:用来绑定事件 -->
	<!-- v-bind:用来绑定属性 -->
	<!-- @mousedown.stop:阻止冒泡 -->
	<!-- @contextmenu.prevent:阻止浏览器默认事件（鼠标右击弹出菜单） -->
<div :class="{unLockLogin:state.isShowLogin}" class="lockscreen"  @keyup="unLockLogin(true)" @mousedown.stop @contextmenu.prevent>
<template v-if="!state.isShowLogin">
<div class="lock-box">
	<div class="lock">
	<span class="lock-icon" title="解锁屏幕" @click="unLockLogin(true)">
		<lock-outlined />
            <unlock-outlined />
	</span>
</div>
<h6 class="tips">点击解锁</h6>
</div>
<!-- is中，是我们自己写的组件，但是html在渲染dom的时候，我们自己写的组件对component来说并不是有效的dom，甚至会报错，正是因为，html模板的限制，于是就诞生了is-->
<component :is="randomCompName" ></component>
</template>


</div>
</template>

<script setup lang="ts">
import { useLockscreenStore } from '@/store/modules/lockscreen';
import { reactive } from 'vue';
import {
    LockOutlined,
    LoadingOutlined,
    UnlockOutlined,
    UserOutlined,
    ApiOutlined,
    ArrowRightOutlined,
    WifiOutlined,
  } from '@ant-design/icons-vue';
	import xiaomiCharge from './xiaomi-charge.vue';
	import HuaweiCharge from './huawei-charge.vue';

	// vue3中ref和reactive的区别：
	// ref打印出来的是一个对象，ref定义的数据打印结果需要.value才能获取到结果，而reactive则不需要，因为reactive定义的数据就是我们定义的他本身
	// reactive 和 ref 都是用来定义响应式数据的 reactive更推荐去定义复杂的数据类型 ref 更推荐定义基本类型
  // ref 和 reactive 本质我们可以简单地理解为ref是对reactive的二次包装， ref定义的数据访问的时候要多一个.value
  // 使用ref定义基本数据类型，ref也可以定义数组和对象。

	const state = reactive({
		isShowLogin:false,
		/** 正在登陆 */
		loginLoading:false,
		loginForm:{
			username:useLockscreenStore.name,
			password:''
		}
	});

	//解锁登陆
	const unLockLogin=(val:boolean)=>(state.isShowLogin=val);

	const randomCompName=Math.random()>0.48?xiaomiCharge:HuaweiCharge;

</script>

<style scoped lang="less"></style>