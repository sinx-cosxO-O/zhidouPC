const app=getApp();
Page({
  data: {
      productName: app.globalData.productName,
  },   
  onload:function(){
    this.setData({
        productName:app.globalData.productName
    })
  },
  onShareAppMessage() {
    return {};
  },
  returnJump:function(){
      console.log("11111111fortest");
      wx.switchTab({
        url: '/pages/PersonalCenter/PersonalCenter',
      })
  },
  changeName(event){
      app.globalData.productName=this.data.productName;
    //   this.onLoad();
  },
  onChange(e){
    this.setData({
        productName:e.detail
    });
    app.globalData.productName=this.data.productName;
  },
});