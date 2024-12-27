Page({
  data: {},

  onShareAppMessage() {
    return {};
  },
  myProduct:function(){
      wx.navigateTo({
        url: '/pages/MyProduct/MyProduct',
      })
  },
  personinfoJump:function(){
      wx.navigateTo({
        url: '/pages/PersonalInformation/PersonalInformation',
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