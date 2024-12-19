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
        url: '/pages/personInformation/personInformation',
      })
  },
  helpJump:function(){
      wx.navigateTo({
        url: '/pages/help/help',
      })
  },
  contextJump:function(){
      wx.navigateTo({
        url: '/pages/help2/help2',
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