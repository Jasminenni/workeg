// pages/playmc/playmc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   titals:""
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var playName = JSON.parse(options.mitems);
    // var mDatas = JSON.parse(options.datas);
   
    // console.log(mDatas)
    // console.log(playName);

    // console.log("获取到的名字："+playName);
    // console.log("获取到的数据" + mDatas);
    var that=this;
    that.setData({titals:playName});
//,aaa:mDatas}
    // console.log(that.data.titals);
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