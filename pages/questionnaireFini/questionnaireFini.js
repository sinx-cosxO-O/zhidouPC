Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  again:function(){
        wx.navigateTo({
          url: '/pages/questionnaire/questionnaire',
        })
  },
  returnBack:function(){
      wx.switchTab({
        url: '/pages/my/my',
      })
  }
});