Page({
  data: {
    items: [null, null, null],
  },

  onShareAppMessage() {
    return {};
  },
  returnJump:function(){
      wx.switchTab({
        url: '/pages/PersonalCenter/PersonalCenter',
      })
  },
  finish:function(){
      wx.navigateTo({
        url: '/pages/questionnaireFini/questionnaireFini',
      })
  }
});