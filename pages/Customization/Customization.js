const app=getApp();
Page({
  data: {
    // 各个部位温度
    realTem:app.globalData.realTem,
    leftChestTem:app.globalData.leftChestTem,
    rightChestTem:app.globalData.rightChestTem,
    leftBackTem:app.globalData.leftBackTem,
    rightBackTem:app.globalData.rightChestTem,
    abdomenTem:app.globalData.abdomenTem,
    activeNames: ['1'],
    rightnames: ['1'],
    leftBackNames: ['1'],
    rightBackNames: ['1'],
    abdomenNames: ['1'],
    option1: [
        { text: '坐着做重型肢体运动', value: 0 },
        { text: '站立做重型肢体运动', value: 1 },
        { text: '做轻松肢体运动', value: 2 },
      ],
      value1: 0,
  },
//   左胸部部分触发代码
    onDragLeftChest(event) {
        this.setData({
            leftChestTem : event.detail.value,
        });
        var num = this.data.leftChestTem;
        app.globalData.leftChestTem=num;
    },
// 右胸部分触发代码
    onDragRightChest(event) {
        this.setData({
            rightChestTem : event.detail.value,
        });
        var num = this.data.rightChestTem;
        app.globalData.rightChestTem=num;
    },
    // 加温度
    onAddLeftChestTem(args) {
      if (this.data.leftChestTem<=15 || this.data.leftChestTem>=35){
          return;
      }
      this.setData({
          leftChestTem : this.data.leftChestTem+1,
      });  
      var num = this.data.leftChestTem;
      app.globalData.leftChestTem=num;
    },
    // 减温度
    onJianLeftChestTem(args) {
      console.log("按下");
      if (this.data.leftChestTem<=15 || this.data.leftChestTem>=35){
          return;
      }
    this.setData({
        leftChestTem : this.data.leftChestTem-1,
    });  
    var num = this.data.leftChestTem;
    app.globalData.leftChestTem=num;
    },
//左背部部分触发代码
    onDragLeftBack(event) {
        this.setData({
            leftBackTem : event.detail.value,
        });
        var num = this.data.leftBackTem;
        app.globalData.leftBackTem=num;
    },
    onAddLeftBcakTem(args) {
        if (this.data.leftBacktTem<=15 || this.data.leftBcakTem>=35){
            return;
        }
        this.setData({
            leftBackTem : this.data.leftBackTem+1,
        });  
        var num = this.data.leftBackTem;
        app.globalData.leftBackTem=num;
        console.log(this.data.leftBackTem);
      },
      // 减温度
    onJianLeftBackTem(args) {
        console.log("按下");
        if (this.data.leftBackTem<=15 || this.data.leftBackTem>=35){
            return;
        }
      this.setData({
          leftBackTem : this.data.leftBackTem-1,
      });  
      var num = this.data.leftBackTem;
      app.globalData.leftBackTem=num;
      },
//右背部部分触发代码
    onDragRightBack(event) {
        this.setData({
            rightBackTem : event.detail.value,
        });
        var num = this.data.rightBackTem;
        app.globalData.rightBackTem=num;
    },
    onAddRightBackTem(args) {
        if (this.data.rightBackTem<=15 || this.data.rightBackTem>=35){
            return;
        }
        this.setData({
            rightBackTem : this.data.rightBackTem+1,
        });  
        var num = this.data.rightBackTem;
        app.globalData.rightBackTem=num;
    },
    // 减温度
    onJianRightBackTem(args) {
        // console.log("按下");
        if (this.data.rightBackTem<=15 || this.data.rightBackTem>=35){
            return;
        }
    this.setData({
        rightBackTem : this.data.rightBackTem-1,
    });  
    var num = this.data.rightBackTem;
    app.globalData.rightBackTem=num;
    },
//腹部部分触发代码
    onDragAbdomen(event) {
        this.setData({
            abdomenTem : event.detail.value,
        });
        var num = this.data.abdomenTem;
        app.globalData.abdomenTem=num;
    },
    onAddAbdomenTem(args) {
        if (this.data.abdomenTem<=15 || this.data.abdomenTem>=35){
            return;
        }
        this.setData({
            abdomenTem : this.data.abdomenTem+1,
        });  
        var num = this.data.abdomenTem;
        app.globalData.abdomenTem=num;
    },
    // 减温度
    onJianAbdomenTem(args) {
        // console.log("按下");
        if (this.data.abdomenTem<=15 || this.data.abdomenTem>=35){
            return;
        }
    this.setData({
        abdomenTem : this.data.abdomenTem-1,
    });  
    var num = this.data.abdomenTem;
    app.globalData.abdomenTem=num;
    },


    onShareAppMessage() {
        return {};
    },
    onClick() {
        wx.navigateTo({ url: '/pages/HomePage/HomePage' });
    },
    onClick_1() {
        wx.navigateTo({ url: '/pages/realtem/realtem' });
    },
    onClick_2() {
        wx.navigateTo({ url: '/pages/PersonalCenter/PersonalCenter' });
    },
    onChange(event) {
        this.setData({
        activeNames: event.detail,
        });
        console.log(event.detail);
    },
    onChangeright(event){
        this.setData({
            rightnames: event.detail,
        });
    },
    onChangeRightBack(event){
        this.setData({
            rightBackNames: event.detail,
        });
    },
    onChangeLeftBack(event){
        this.setData({
            leftBackNames: event.detail,
        });
    },
    onChangeAbdomen(event){
        this.setData({
            abdomenNames: event.detail,
        });
    },
    buttonChange1(){
        this.setData({
                activeNames : ["1"],
            });
        },
        buttonChange2(){
        this.setData({
                rightnames : ["1"],
            });
        },
    buttonChange3(){
        this.setData({
                leftBackNames : ["1"],
            });
        },
    buttonChange4(){
        this.setData({
                rightBackNames : ["1"],
            });
        },
    buttonChange5(){
        this.setData({
                abdomenNames : ["1"],
            });
        },
});