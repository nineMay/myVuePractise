import { IS_LOCKSCREEN } from "@/enums/cacheEnum";
import { defineStore } from "pinia";
import { Storage } from "@/utils/Storage";
import { store } from "..";

export type LockscreenState = {
  //是否锁屏
  isLock: boolean;
  lockTime: number;
};

//默认不锁屏
const isLock = Storage.get(IS_LOCKSCREEN, false);
// 长时间不操作默认锁屏时间
const initTime = 60 * 60;

export const useLockscreenStore = defineStore({
  id: "lockscreen",
  state: (): LockscreenState => ({
    //是否锁屏
    isLock: isLock === true,
    lockTime: isLock == true ? initTime : 0,
  }),
  actions: {
    setLock(isLock) {
      this.isLock = isLock;
      Storage.set(IS_LOCKSCREEN, this.isLock);
    },
    setLockTime(lockTime = initTime) {
      this.lockTime = lockTime;
    },
  },
});

/** 在组件setup 函数外使用 */
export function useLockscreenStoreWithOut() {
  return useLockscreenStore(store);
}
