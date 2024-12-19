Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  returnJump:function(){
      wx.switchTab({
        url: '/pages/my/my',
      })
  },
  shuomingshuJump:function(){
      wx.navigateTo({
        url: '/pages/chanpinshuomingshu/chanpinshuomingshu',
      })
  },
  kefuJump:function(){
      wx.navigateTo({
        url: '/pages/help2/help2',
      })
  }
});