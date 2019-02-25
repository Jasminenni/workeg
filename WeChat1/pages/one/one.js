// pages/one/one.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    name:"",
    pwd:"",
    //页面的一组数据 
    arrayDates:["one","two","three","four","five"],
    //轮播图的静态（写死的）数据
    topimages:["../images/aaa.jpg","../images/bbb.jpg","../images/ccc.jpg"],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收传送到的数据
    var oneName=options.name;
    console.log(oneName);

    var pass=options.pwd;
    console.log(pass);

    var that=this;
    that.setData({name:oneName,pwd:pass});
  
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