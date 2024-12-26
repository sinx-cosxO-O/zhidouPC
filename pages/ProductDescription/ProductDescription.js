Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  returnJump(){
      wx.navigateTo({
        url: '/pages/help/help',
      })
  }
});