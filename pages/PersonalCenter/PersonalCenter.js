Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  myProduct:function(){
      wx.navigateTo({
        url: '/pages/myproduct/myproduct',
      })
  },
  personinfoJump:function(){
      wx.navigateTo({
        url: '/pages/PersonInformation/PersonInformation',
      })
  },
  helpJump:function(){
      wx.navigateTo({
        url: '/pages/help/help',
      })
  },
  contextJump:function(){
      wx.navigateTo({
        url: '/pages/ContactUs/ContactUs',
      })
  },
  questionJump:function(){
      wx.navigateTo({
        url: '/pages/questionnaire/questionnaire',
      })
  },
  Quit:function(){
    //退出小程序
    wx.exitMiniProgram({success: (res) => {}})
  }
});