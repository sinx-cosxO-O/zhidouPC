Page({
  data: {
    items: [null, null, null, null],
  },

  onShareAppMessage() {
    return {};
  },
  History:function(){
    wx.navigateTo({
      url: '../../pages/wendu/wendu',
    })
  }
});