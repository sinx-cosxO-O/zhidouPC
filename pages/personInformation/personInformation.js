Page({
  data: {
    items: [null, null],
    boy : true,
    girl : false,
  },

  onShareAppMessage() {
    return {};
  },
  onChangeBoy(event){
    this.setData({
        boy: event.detail,
    });
  },
  onChangeGirl(event){
    this.setData({
        girl: event.detail,
    });
  },
  returnJump:function(){
      wx.switchTab({
        url: '/pages/PersonalCenter/PersonalCenter',
      })
  }
});