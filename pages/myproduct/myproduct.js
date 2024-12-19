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
      console.log("11111");
      wx.switchTab({
        url: '/pages/my/my',
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