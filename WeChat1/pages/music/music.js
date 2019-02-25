// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mData: [{ "img": "../images/music1.jpg", "name": "三生三世 (Cover 张杰)", "path":"../video/三生三世 (Cover 张杰).mp3","author":"万辰"}, 
      { "img": "../images/music2.jpg", "name": " Angel of Mine", "path": "../video/Angel of Mine.mp3", "author": "The Icarus Account"},
      { "img": "../images/music3.jpg", "name": "Invincible", "path": "../video/Invincible.mp3", "author": "Hedley"}],
  nullItem:{}, 
  },
  mclick:function(e){
    //获取点击事件
    // console.log(e);
    //定义点击事件的值并输出
    var mplay = e.currentTarget.dataset.mitem;
 
    console.log(mplay);
    //判断输出数据的数据类型
    // console.log(typeof mpaly);
    var that=this;
    that.setData({ nullItem: mplay});
  wx.navigateTo({
    url: "../playmc/playmc?mitems=" + JSON.stringify(this.data.nullItem),
    })

    // console.log(JSON.stringify(this.data.mData))
    
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