<template>
  <!-- 向locale传值 -->
  <ConfigProvider :locale="getAntdLocale">
  <router-view #="{Component}">
  <component :is="Component"></component>
  </router-view>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import { watchEffect } from 'vue';
import {useRoute} from 'vue-router';
  // import { transformI18n } from './hooks/useI18n';
    // import { LockScreen } from '@/components/basic/lockscreen';
    import { useLocale } from '@/locales/useLocale';

const route=useRoute();
const {getAntdLocale}=useLocale();

watchEffect(()=>{
  if(route.meta?.title){
    //翻译网页标题
    // document.title=transformI18n(route.meta.title);
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
