Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  returnJump:function(){
      wx.switchTab({
        url: '/pages/PersonalCenter/PersonalCenter',
      })
  },
  shuomingshuJump:function(){
      wx.navigateTo({
        url: '/pages/ProductDescription/ProductDescription',
      })
  },
  kefuJump:function(){
      wx.navigateTo({
        url: '/pages/ContactUs/ContactUs',
      })
  }
});