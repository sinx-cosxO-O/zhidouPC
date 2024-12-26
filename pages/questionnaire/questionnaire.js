Page({
  data: {
    items: [null],
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