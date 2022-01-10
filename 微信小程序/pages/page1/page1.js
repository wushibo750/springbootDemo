// pages/page1/page1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'wushibo',
    arr:[],
    test:{}  //对象
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //先onLoad再用onshow函数
  onLoad: function (options) {
    this.setData({
      name:'120'          //修改变量的值
    })
    console.log(this.data.name); //打印出来
    this.setData({
      tmp:'定义一个变量，然后在data中调用！'
    })
    var arrTemp=[];
    for(var i=0;i<10;i++){
      arrTemp.push({    // push方法
        id:i,  
        name:'hello',  //可以push进去一个JSON
      });
    };
    console.log(this.data.arr);
    this.setData({
      arr:arrTemp
    });
    console.log(this.data.arr);
    wx.showToast({
      title: 'success wushibo',
      // duration: 0,
      // icon: icon,
      // image: 'image',
      // mask: true,
      // success: (res) => {},
      // fail: (res) => {},
      // complete: (res) => {},
    })
    wx.request({
      url: 'url',
      data: data,
      dataType: dataType,
      enableCache: true,
      enableHttp2: true,
      enableQuic: true,
      header: header,
      method: method,
      responseType: responseType,
      timeout: 0,
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})