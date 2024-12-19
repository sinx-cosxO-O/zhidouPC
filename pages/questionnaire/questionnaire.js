Page({
  data: {
    items: [null, null, null],
  },

  onShareAppMessage() {
    return {};
  },
  returnJump:function(){
      wx.switchTab({
        url: '/pages/my/my',
      })
  },
  finish:function(){
      wx.navigateTo({
        url: '/pages/questionnaireFini/questionnaireFini',
      })
  }
});