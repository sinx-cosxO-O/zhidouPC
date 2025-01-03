const app = getApp()

function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

Page({
  //数据定义
  data: {
    devices: [], //搜索到的设备
    connected: false, //是否连接
    chs: [], //蓝牙特征信息
  },
  //打开蓝牙适配器
  /*
   * 初始化蓝牙模块
   * 处理蓝牙未开启时的监听逻辑
   */
  openBluetoothAdapter() {
    console.log("connect");
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log('openBluetoothAdapter success', res)
        this.startBluetoothDevicesDiscovery() // 成功打开后开始搜索蓝牙设备
      },
      fail: (res) => {
        if (res.errCode === 10001) { // 错误码 10001 表示蓝牙未开启
          wx.onBluetoothAdapterStateChange(function (res) {
            console.log('onBluetoothAdapterStateChange', res)
            if (res.available) {
              this.startBluetoothDevicesDiscovery()
            }
          })
        }
      }
    })
  },

  // 获取蓝牙适配器状态
  //检查当前蓝牙状态是否可用并根据状态采取行动
  getBluetoothAdapterState() {
    wx.getBluetoothAdapterState({
      success: (res) => {
        console.log('getBluetoothAdapterState', res) //发现设备后处理
        if (res.discovering) {
          this.onBluetoothDeviceFound()
        } else if (res.available) {
          this.startBluetoothDevicesDiscovery() //开始搜索设备
        }
      }
    })
  },

  //开始和停止蓝牙设备搜索
  startBluetoothDevicesDiscovery() {
    if (this._discoveryStarted) { //防止重复启动
      return
    }
    this._discoveryStarted = true
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: false,
      success: (res) => {
        console.log('startBluetoothDevicesDiscovery success', res)
        this.onBluetoothDeviceFound()
      },
    })
  },
  stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery()
  },

  // 搜索到设备时的处理逻辑
  onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound((res) => {
      res.devices.forEach(device => {
        if (!device.name && !device.localName) {
          return
        }
        const foundDevices = this.data.devices
        const idx = inArray(foundDevices, 'deviceId', device.deviceId)
        const data = {}
        if (idx === -1) {
          data[`devices[${foundDevices.length}]`] = device
        } else {
          data[`devices[${idx}]`] = device
        }
        this.setData(data)
      })
    })
  },

  //蓝牙连接设备
  createBLEConnection(e) {
    const ds = e.currentTarget.dataset
    const deviceId = ds.deviceId
    const name = ds.name
    console.log(deviceId, name)
    wx.createBLEConnection({
      deviceId,
      success: (res) => {
        this.setData({
          connected: true,
          name,
          deviceId,
        })
        app.globalData.readDeviceId = ds.deviceId;
        app.globalData.writeDeviceId = ds.deviceId;
        console.log("lianjie Deviceid" + deviceId);
        this.getBLEDeviceServices(deviceId);
        wx.navigateTo({
          //url: '../control/control?connectedDeviceId=' + deviceId + '&name=' + name, // 将URL替换为你的 control 页面路径
          url: '/pages/HomePage/HomePage'
        });
      }
    })
    this.stopBluetoothDevicesDiscovery()
  },

  //==================================================这个好像没有使用上，断掉蓝牙连接的==========================================
  closeBLEConnection() {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId
    })
    this.setData({
      connected: false,
      chs: [],
      canWrite: false,
    })
  },

  //获取蓝牙设备服务和特征值
  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid) // 获取特征值
            return
          }
        }
      }
    })
  },

  getBLEDeviceCharacteristics(deviceId, serviceId) {
    console.log("deviceId:", deviceId)
    console.log("serviceId:", serviceId)
    //定义一些全局变量
    app.globalData.readDeviceId = deviceId;
    app.globalData.writeDeviceId = deviceId;
    app.globalData.readServiceId = serviceId;
    app.globalData.writeServiceId = serviceId;
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i]
          //   console.log("hahahalength"+res.characteristics.length);
          if (item.properties.read) {
            app.globalData.readCharacteristicId = item.uuid;
          }
          if (item.properties.write) {
            this.setData({
              canWrite: true
            })
            app.globalData.writeCharacteristicId = item.uuid;
            this._deviceId = deviceId
            this._serviceId = serviceId
            this._characteristicId = item.uuid
            this.writeBLECharacteristicValue()
            console.log("write" + this._deviceId);
          }
          if (item.properties.notify || item.properties.indicate) {
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
          }
        }
        console.log("app" + JSON.stringify(app.globalData));
      },
      fail(res) {
        console.error('getBLEDeviceCharacteristics', res)
      }
    })
    // 操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange((characteristic) => {
      const idx = inArray(this.data.chs, 'uuid', characteristic.characteristicId)
      const data = {}
      if (idx === -1) {
        data[`chs[${this.data.chs.length}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      } else {
        data[`chs[${idx}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      }
      // data[`chs[${this.data.chs.length}]`] = {
      //   uuid: characteristic.characteristicId,
      //   value: ab2hex(characteristic.value)
      // }
      this.setData(data)
    })
  },

  //写入数据
  writeBLECharacteristicValue() {
    // 向蓝牙设备发送一个0x00的16进制数据
    let buffer = new ArrayBuffer(1)
    let dataView = new DataView(buffer)
    dataView.setUint8(0, Math.random() * 255 | 0) //生成随机数据
    wx.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._deviceId,
      characteristicId: this._characteristicId,
      value: buffer,
    })
  },

  //关闭蓝牙连接和适配器
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter()
    this._discoveryStarted = false
  },

  //回到主页
  returnJump: function () {
    console.log("11111");
    wx.switchTab({
      url: '/pages/HomePage/HomePage',
    })
  }
})