// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

    viewclick:function(e){
      /**
       * 在控制台上输出点击顶部view的信息
       */
      console.log(e);
      //js定义变量
      var clickValue = e.currentTarget.dataset.text;
      console.log(clickValue);
      //去判断点击的值，输出获取的值的类型，
      //js判断变量的类型是typeof
      console.log(typeof clickValue);
      var path="";

      if(clickValue=="page1")
      {
        console.log("跳转到页面一");
        // wx.navigateTo({
        //   url: '../home/home',
        // })

        //定义跳转路径的变量
        path="../home/home";
      }
      else if (clickValue == "page2"){
        console.log("跳转到页面二");
        //真正的执行跳转页面
        // wx.navigateTo({
        //   url: '../phone/phone',
        // })
        path ="../one/one?name=Jasmine&pwd=123456";
      }

      console.log(path);
      wx.navigateTo({
        url: path,
      })

      
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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