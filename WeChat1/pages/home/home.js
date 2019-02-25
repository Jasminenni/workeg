// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图的数据
    imageData:["../images/aaa.jpg", "../images/bbb.jpg","../images/ccc.jpg"],
    //九宫格的数据
    imgDatas:[
      { "img":"../images/news.png","title":"新闻"},
      { "img":"../images/sports.png","title":"运动"},
      { "img":"../images/military(1).png","title":"军事"},
      { "img":"../images/place(1).png","title":"地图"},
      { "img":"../images/car(1).png","title":"汽车"},
      { "img":"../images/movie.png","title":"影音"},
      { "img":"../images/shopping.png","title":"购物"},
      { "img":"../images/network.png","title":"互联网"},
      { "img":"../images/calendar.png","title":"日历"},
    ],
  },
  imgClick:function(e){
    // console.log(e);
    var responseData = e.currentTarget.dataset.title;
    // console.log(responseData);
    //判断返回的数据类型
    // console.log(typeof responseData);

    var path="";

    if (responseData=="影音")
    {
      path="../music/music";   
    }
   else if (responseData == "新闻") {
      path = "../juhe/juhe";
    }
    
    else if(responseData=="运动"){
      path= "../two/two?title=" + responseData;
    }  
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