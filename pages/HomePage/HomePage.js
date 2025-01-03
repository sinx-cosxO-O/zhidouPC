const app = getApp();

function stringToByte(str) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0);
      bytes.push(((c >> 12) & 0x3F) | 0x80);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0);
      bytes.push((c & 0x3F) | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes;
}

Page({
  //数据初始化
  data: {
    switchV: false, //这里是“连接设备”的默认值
    //=======================================这里要改===============================================//
    setTem: app.globalData.setTem, //全局变量
    realTem: app.globalData.realTem, //全局变量
    Press: app.globalData.Press, //压力大小
    option1: [{
        text: '豆浆',
        value: 0
      },
      {
        text: '豆腐脑',
        value: 1
      },
      {
        text: '豆腐',
        value: 2
      },
      {
        text: '果蔬',
        value: 3,
      },
    ],
    value1: 0,
  },

  //小程序页面右上角的分享按钮，默认内容
  onShareAppMessage() {
    return {};
  },

  //=============================================蓝牙连接=============================================//
  //开关-进入蓝牙连接界面
  onSwitchChange(event) {
    //让开关状态不自动变化
    this.setData({
      switchV: event.detail
    });
    //获取开关的当前状态
    const isChecked = event.detail
    //判断开关状态
    if (isChecked) {
      this.switchOn();
    } else {
      this.swithOff();
    }
  },
  //开关开
  switchOn() {
    console.log("BLE connecting...");
    wx.navigateTo({
      url: '/pages/BlueTooth/BlueTooth',
    });

  },
  switchOff() {
    console.log("BLE disconnected")
    ////////////////////这里补一个断掉蓝牙====================================================================
  },


  //================================================================待测试========================================================
  // 蓝牙发送函数
  sendDataToBLE(data) {
    console.log('Sending data to BLE device:', data);

    // 将数据转换为 ArrayBuffer
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, data, false); // 写入 4 字节的整数数据

    // 输出调试信息
    console.log('Sending value:', data);
    console.log('Buffer:', new Uint8Array(buffer));
    console.log('Characteristic ID:', app.globalData.writeCharacteristicId);
    console.log('Device ID:', app.globalData.writeDeviceId);
    console.log('Service ID:', app.globalData.writeServiceId);

    wx.writeBLECharacteristicValue({
      characteristicId: app.globalData.writeCharacteristicId, // 写入特征值的 UUID
      deviceId: app.globalData.writeDeviceId, // 设备 ID
      serviceId: app.globalData.writeServiceId, // 服务 UUID
      value: buffer, // 发送的缓冲区数据
      success: function (res) {
        console.log('Data sent successfully:', res);
      },
      fail: function (err) {
        console.error('Failed to send data:', err);
      },
    }, );
  },


  //"开始制作"
  finish() {
    //======================================================这里需要通信了=============================================
    const value1 = this.data.value1;
    let dataToSend;
    // 根据 value1 的值决定要发送的数据
    switch (value1) {
      case 0: // 豆浆
        dataToSend = 1111;
        break;
      case 1: // 豆腐脑
        dataToSend = 2222;
        break;
      case 2: // 豆腐
        dataToSend = 3333;
        break;
      case 3: // 果蔬
        dataToSend = 4444;
        break;
      default:
        console.error('Invalid value1:', value1);
        wx.showToast({
          title: '无效的选择',
          icon: 'error',
          duration: 1000,
        });
        return; // 如果 value1 无效，直接退出函数
    }
    // 向蓝牙设备发送数据
    this.sendDataToBLE(dataToSend);
    //显示提示信息
    wx.showToast({
      title: '开始制作111！', //提示文字 弹出界面
      duration: 1000, //显示时长
      mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
      icon: 'success', //图标，支持"success"、"loading"  
      success: function () {}, //接口调用成功
      fail: function () {}, //接口调用失败的回调函数  
      complete: function () {} //接口调用结束的回调函数  
    })
  },


  onClick() {
    wx.navigateTo({
      url: '/pages/PersonalCenter/PersonalCenter'
    });
  },
  onClick_1() {
    wx.navigateTo({
      url: '/pages/Customization/Customization'
    });
  },
  onClick_2() {
    wx.navigateTo({
      url: '/pages/Record/Record'
    });
  },
  onClick_3() {
    wx.navigateTo({
      url: '/pages/PersonalCenter/PersonalCenter'
    });
  },

  //=====================================蓝牙发送 这里还没有调整===========================
  BlechangeTem() {
    const number = this.data.setTem;
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, number, false);
    console.log(new Uint8Array(buffer));
    console.log("buffer" + buffer);
    console.log(app.globalData.writeCharacteristicId)
    console.log(app.globalData.writeDeviceId)
    console.log(app.globalData.writeServiceId)
    wx.writeBLECharacteristicValue({
      characteristicId: app.globalData.writeCharacteristicId,
      deviceId: app.globalData.writeDeviceId,
      serviceId: app.globalData.writeServiceId,
      value: buffer,
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log(err)
      }
    })
    console.log("send____" + app.globalData.writeCharacteristicId);
  },

  //===========================================压力大小===========================================
  AddPress(args) {
    console.log("按下");
    if (this.data.Press <= 15 || this.data.Press >= 35) {
      return;
    }
    this.setData({
      Press: this.data.Press + 1,
    });
    var num = this.data.Press;
    app.globalData.Press = num;
    //=============================暂时没有发送数据
    //this.BlechangeTem();
  },

  //减号
  SubtractPress(args) {
    console.log("按下");
    if (this.data.Press <= 15 || this.data.Press >= 35) {
      return;
    }
    this.setData({
      Press: this.data.Press - 1,
    });
    var num = this.data.Press;
    app.globalData.Press = num;
  },

  //   滑块部分触发代码
  onDragPress(event) {
    this.setData({
      Press: event.detail.value,
    });
    var num = this.data.Press;
    app.globalData.Press = num;
  },

  //===========================================压制时间===========================================

  // 加号
  onAddTem(args) {
    console.log("按下");
    if (this.data.setTem <= 15 || this.data.setTem >= 35) {
      return;
    }
    this.setData({
      setTem: this.data.setTem + 1,
    });
    var num = this.data.setTem;
    app.globalData.setTem = num;
    this.BlechangeTem();
  },
  //减号
  onJianTem(args) {
    console.log("按下");
    if (this.data.setTem <= 15 || this.data.setTem >= 35) {
      return;
    }
    this.setData({
      setTem: this.data.setTem - 1,
    });
    var num = this.data.setTem;
    app.globalData.setTem = num;
  },

  //   滑块部分触发代码
  onDrag(event) {
    this.setData({
      setTem: event.detail.value,
    });
    var num = this.data.setTem;
    app.globalData.setTem = num;
  },

});