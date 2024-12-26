App({
  onLaunch() {},
  globalData: {
    // 设备名称
    productName:"知豆家用智能豆腐机",
    // 用户名称
    username: "zoe",
    // 各部位的温度
    //冷量计算需要，我们后续会删掉
    setTem : 26,
    realTem : 25,
    leftChestTem : 26,
    rightChestTem : 26,
    leftBackTem :26,
    rightBackTem :26,
    abdomenTem : 26,
    // 蓝牙相关
    writeDeviceId : "",
    writrServiceId: "",
    writeCharacteristicId: "",
    readDeviceId: "",
    readServiceId: "",
    readCharacteristicId: "",
  },
  
})
