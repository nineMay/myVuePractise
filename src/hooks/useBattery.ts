export type Battery = {
  /** 当前电池是否正在充电 */
  charging: boolean;
  /** 距离充电完毕还剩多少秒，如果为0则充电完毕 */
  chargingTime: number;
  /** 代表距离电池耗电至空且挂起需要多少秒 */
  dischargeingTime: number;
  /** 代表电量的放大等级，这个值在0.0至1.0之间 */
  level: number;
  [key: string]: any;
};
