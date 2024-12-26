const app=getApp();
function stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for(var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if(c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}
Page({
  data: {
    switchV: false,
    switchV_1: false,
    setTem: app.globalData.setTem,
    realTem: app.globalData.realTem,
    option1: [
        { text: '坐着做重型肢体运动', value: 0 },
        { text: '站立做重型肢体运动', value: 1 },
        { text: '做轻松肢体运动', value: 2 },
      ],
      value1: 0,
  },
  onShareAppMessage() {
    return {};
  },
  onSwitchChange(event) {
    this.setData({
      switchV: event.detail,
    });
    wx.navigateTo({
      url: '/pages/guide/guide',
    })
  },
  BlechangeTem(){
    const number = this.data.setTem; 
    const buffer = new ArrayBuffer(4); 
    const view = new DataView(buffer);
    view.setUint32(0, number, false);
    console.log(new Uint8Array(buffer));
    console.log("buffer"+buffer);
    console.log(app.globalData.writeCharacteristicId)
    console.log(app.globalData.writeDeviceId)
    console.log(app.globalData.writeServiceId)
    wx.writeBLECharacteristicValue({
      characteristicId: app.globalData.writeCharacteristicId,
      deviceId: app.globalData.writeDeviceId
      
      
      ,
      serviceId: app.globalData.writeServiceId,
      value: buffer,
      success :function(res)
      {
        console.log(res)
      },
      fail :function(err)
      {
        console.log(err)
      }
    })
    console.log("send____"+app.globalData.writeCharacteristicId);

  },
  onSwitchChange_1(event) {
      console.log("222");
    this.setData({
      switchV_1: event.detail,
    });
  },
  onAddTem(args) {
      console.log("按下");
    if (this.data.setTem<=15 || this.data.setTem>=35){
        return;
    }
    this.setData({
        setTem : this.data.setTem+1,
    });  
    var num = this.data.setTem;
    app.globalData.setTem=num;
    this.BlechangeTem();
  },
  onJianTem(args) {
    console.log("按下");
    if (this.data.setTem<=15 || this.data.setTem>=35){
        return;
    }
  this.setData({
      setTem : this.data.setTem-1,
  });  
  var num = this.data.setTem;
  app.globalData.setTem=num;
},
//   滑块部分触发代码
  onDrag(event) {
    this.setData({
        setTem : event.detail.value,
    });
    var num = this.data.setTem;
    app.globalData.setTem=num;
  },
  finish(){
    wx.showToast({
        title: '调整成功',//提示文字
        duration:1000,//显示时长
        mask:true,//是否显示透明蒙层，防止触摸穿透，默认：false  
        icon:'success', //图标，支持"success"、"loading"  
        success:function(){ },//接口调用成功
        fail: function () { },  //接口调用失败的回调函数  
        complete: function () { } //接口调用结束的回调函数  
     })
  },
  onClick() {
    wx.navigateTo({ url: '/pages/PersonalCenter/PersonalCenter' });
  },
  onClick_1() {
    wx.navigateTo({ url: '/pages/set/set' });
  },
  onClick_2() {
    wx.navigateTo({ url: '/pages/wendu/wendu' });
  },
  onClick_3() {
    wx.navigateTo({ url: '/pages/PersonalCenter/PersonalCenter' });
  },
});
