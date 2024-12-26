Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  returnJump:function(){
      wx.switchTab({
        url: '/pages/PersonalCenter/PersonalCenter',
      })
  }
});