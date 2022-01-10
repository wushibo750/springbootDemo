// pages/page2/page2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8080/api/test/hello',
      method:'GET',
      success(r){
        console.log(r.data);  
        that.setData({
            test:r.data
        })
      }
    })
    wx.request({
      url: 'http://127.0.0.1:8080/api/test/upload',
      method:'POST',
      data:{
        num1:15,
        num2:102
      },
      success(r){ //接收return返回的值
        console.log(r.data);
      }
     
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})