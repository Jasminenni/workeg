// pages/juhe/juhe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesDates:[],
    newsDates: [],
    nullNew:{},
  },
  newClick:function(e){
    //首先获取点击事件的数据
    //console.log(e);
    //找到设置的data并输出
    var unew = e.currentTarget.dataset.unew;
    console.log(unew);
   
    var that =this;
    that.setData({nullNew:unew});

    // console.log(that.data.nullNew);
    wx.navigateTo({
      //带参传数据。传递的是对象
      url: '../news/news?newData=' + JSON.stringify(that.data.nullNew),
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log("聚合数据被加载");
  var conobj = this;

  //页面刚加载，请求聚合数据，拿到聚合数据的新闻
  wx.request({
    
    url: 'http://v.juhe.cn/toutiao/index',
    data: { "key":"f948ae06f656d84e580ca4c370adc4ac","type":"top"},
    header:{
      "content-type":"application/json"
    },
    //请求聚合数据成功后，在成功的函数中获取数据，
    success:function(response){
      console.log(response.data);
      conobj.setData({ imagesDates:response.data.result.data});
      conobj.setData({ newsDates:response.data.result.data})


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