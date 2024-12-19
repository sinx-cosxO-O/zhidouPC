Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  returnJump:function(){
      wx.switchTab({
        url: '/pages/my/my',
      })
  }
});