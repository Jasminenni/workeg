// pages/musiceg/musiceg.js
const app = getApp()
const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    audiolist: [
      {
        audiosrc: 'http://other.web.rh01.sycdn.kuwo.cn/resource/n2/16/17/450264753.mp3',
        coverimg: "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg"
      }
    ],
    isPlayAudio: false,
    audioSeek: 0,
    audioDuration: 0,
    showTime1: '00:00',
    showTime2: '00:00',
    audioTime: 0
  },
  onLoad: function () {

  },
  onShow: function () {
    this.Initialization();
    this.loadaudio();
  },
  //初始化播放器，获取duration
  Initialization() {
    var t = this;
    if (this.data.audiolist[0].audiosrc.length != 0) {
      //设置src
      innerAudioContext.src = this.data.audiolist[0].audiosrc;
      //运行一次
      innerAudioContext.play();
      innerAudioContext.pause();
      innerAudioContext.onCanplay(() => {
        //初始化duration
        innerAudioContext.duration
        setTimeout(function () {
          //延时获取音频真正的duration
          var duration = innerAudioContext.duration;
          var min = parseInt(duration / 60);
          var sec = parseInt(duration % 60);
          if (min.toString().length == 1) {
            min = `0${min}`;
          }
          if (sec.toString().length == 1) {
            sec = `0${sec}`;
          }
          t.setData({ audioDuration: innerAudioContext.duration, showTime2: `${min}:${sec}` });
        }, 1000)
      })
    }
  },
  //拖动进度条事件
  sliderChange(e) {
    var that = this;
    innerAudioContext.src = this.data.audiolist[0].audiosrc;
    //获取进度条百分比
    var value = e.detail.value;
    this.setData({ audioTime: value });
    var duration = this.data.audioDuration;
    //根据进度条百分比及歌曲总时间，计算拖动位置的时间
    value = parseInt(value * duration / 100);
    //更改状态
    this.setData({ audioSeek: value, isPlayAudio: true });
    //调用seek方法跳转歌曲时间
    innerAudioContext.seek(value);
    //播放歌曲
    innerAudioContext.play();
  },
  //播放、暂停按钮
  playAudio() {
    //获取播放状态和当前播放时间
    var isPlayAudio = this.data.isPlayAudio;
    var seek = this.data.audioSeek;
    innerAudioContext.pause();
    //更改播放状态
    this.setData({ isPlayAudio: !isPlayAudio })
    if (isPlayAudio) {
      //如果在播放则记录播放的时间seek，暂停
      this.setData({ audioSeek: innerAudioContext.currentTime });
    } else {
      //如果在暂停，获取播放时间并继续播放
      innerAudioContext.src = this.data.audiolist[0].audiosrc;
      if (innerAudioContext.duration != 0) {
        this.setData({ audioDuration: innerAudioContext.duration });
      }
      //跳转到指定时间播放
      innerAudioContext.seek(seek);
      innerAudioContext.play();
    }
  },
  loadaudio() {
    var that = this;
    //设置一个计步器
    this.data.durationIntval = setInterval(function () {
      //当歌曲在播放时执行
      if (that.data.isPlayAudio == true) {
        //获取歌曲的播放时间，进度百分比
        var seek = that.data.audioSeek;
        var duration = innerAudioContext.duration;
        var time = that.data.audioTime;
        time = parseInt(100 * seek / duration);
        //当歌曲在播放时，每隔一秒歌曲播放时间+1，并计算分钟数与秒数
        var min = parseInt((seek + 1) / 60);
        var sec = parseInt((seek + 1) % 60);
        //填充字符串，使3:1这种呈现出 03：01 的样式
        if (min.toString().length == 1) {
          min = `0${min}`;
        }
        if (sec.toString().length == 1) {
          sec = `0${sec}`;
        }
        var min1 = parseInt(duration / 60);
        var sec1 = parseInt(duration % 60);
        if (min1.toString().length == 1) {
          min1 = `0${min1}`;
        }
        if (sec1.toString().length == 1) {
          sec1 = `0${sec1}`;
        }
        //当进度条完成，停止播放，并重设播放时间和进度条
        if (time >= 100) {
          innerAudioContext.stop();
          that.setData({ audioSeek: 0, audioTime: 0, audioDuration: duration, isPlayAudio: false, showTime1: `00:00` });
          return false;
        }
        //正常播放，更改进度信息，更改播放时间信息
        that.setData({ audioSeek: seek + 1, audioTime: time, audioDuration: duration, showTime1: `${min}:${sec}`, showTime2: `${min1}:${sec1}` });
      }
    }, 1000);
  },
  onUnload: function () {
    //卸载页面，清除计步器
    clearInterval(this.data.durationIntval);
  },
  videoControl(e) {//控制视频播放，需求更改后暂时无用
    let src = e.currentTarget.dataset.src
    let img = e.currentTarget.dataset.post
    let data = this.data.cc
    let that = this
    if (this.data.innerAudioContext2) {
      that.data.innerAudioContext2.stop()
    }
    if (this.data.innerAudioContext) {
      that.data.innerAudioContext.stop()
      that.setUser(that.data.oldid, false)
    }
    for (var i = 0; i < data.length; i++) {
      if (data[i].type == '2') {
        data[i].play = true
      }
    }
    this.setData({
      cc: data
    })
    if (this.data.type) {
      wx.navigateTo({
        url: '/pages/record/record?cid=' + this.data.cid + '&src=' + src + '&img=' + img + '&type="share"'
      })
    } else {
      wx.navigateTo({
        url: '/pages/record/record?cid=' + this.data.cid + '&src=' + src + '&img=' + img
      })
    }
  },
  audioControl(e) {//控制课程音频播放，需求更改后暂时无用
    let index = e.currentTarget.dataset.index
    let that = this
    let data = this.data.cc
    if (this.data.innerAudioContext) {
      that.data.innerAudioContext.stop()
      that.setUser(that.data.oldid, false)
    }
    for (var i = 0; i < data.length; i++) {
      if (data[i].type == '2' && i != index) {
        data[i].play = true
      } else if (data[i].type == '2') {
        data[i].play = false
      } if (data[i].type == '3') {
        data[i].play = true
      }
    }
    if (!that.data.innerAudioContext2) {//第一次点击音频
      that.data.innerAudioContext2 = wx.createInnerAudioContext();
      that.data.innerAudioContext2.src = e.currentTarget.dataset.srcs
      that.data.innerAudioContext2.play()
      that.data.innerAudioContext2.onPlay(() => {
      })
      that.data.innerAudioContext2.onStop(() => {
      })
      that.setData({//记录当前点击项和上次点击项
        newid2: e.currentTarget.dataset.index,
        oldid2: that.data.newid2 ? that.data.newid2 : index
      })
    } else {//非第一次点击
      let old = that.data.newid2
      that.setData({
        newid2: index,
        oldid2: old
      })
      if (that.data.oldid2 != index) {
        that.data.innerAudioContext2.stop()
        that.data.innerAudioContext2.src = e.currentTarget.dataset.srcs
        that.data.innerAudioContext2.play()
      } else {
        if (that.data.innerAudioContext2.paused) {
          that.data.innerAudioContext2.stop()
          that.data.innerAudioContext2.src = e.currentTarget.dataset.srcs
          that.data.innerAudioContext2.play()
        } else {
          that.data.innerAudioContext2.stop()
          for (var i = 0; i < data.length; i++) {
            data[i].play = true
          }
        }
      }
    }
    this.setData({
      cc: data
    })
  },
  playAudio(e) {//带滚动条多个音频处理问题
    let that = this
    let arr = that.data.cc
    let index = e.currentTarget.dataset.index
    if (that.data.audio) {//将所有的音频停止
      that.data.audio.pause()
    }
    for (let i = 0; i < arr.length; i++) {//将所有的音频置为停止状态
      that.setAudioType(i, false, true)
    }
    that.setAudioType(index, true, false)//将当前音频置为播放状态
    that.data.audio = wx.getBackgroundAudioManager();//初始化音频并播放
    that.data.audio.src = e.currentTarget.dataset.src
    that.data.audio.title = '泰格英语'
    that.data.audio.epname = '泰格英语'
    that.data.audio.autoplay = true
    that.data.audio.play();
    //音频开始播放的时间
    if (arr[index].currentProcessNum != 0) {
      that.data.audio.startTime = arr[index].currentProcessNum
    }
    //音频自然播放结束
    that.data.audio.onEnded(function name(params) {
      that.setCurrent(index, "00:00", 0)
      that.setAudioType(index, false, false)
    })
    //音频进度播放更新
    that.data.audio.onTimeUpdate(function () {
      //设置总时长
      if (arr[index].totalProcess == '00:00' || arr[index].totalProcessNum == '00:00') {
        that.setTotal(index, that.time_to_sec(that.data.audio.duration), that.data.audio.duration)
      }
      //没有触动滑动事件更新进度
      if (!arr[index].isMove) {
        that.setCurrent(index, that.time_to_sec(that.data.audio.currentTime), that.data.audio.currentTime)
      }
    })
  },
  //开始滑动触发
  start: function (e) {
    let arr = this.data.cc
    let index = e.currentTarget.dataset.index
    this.move(index, true)
  },
  //触发滑动条
  changeSlide: function (e) {
    let that = this
    let arr = that.data.cc
    let index = e.currentTarget.dataset.index
    const position = e.detail.value
    let seek = arr[index].seek
    seek = position
    if (seek != -1) {
      wx.seekBackgroundAudio({
        position: Math.floor(position),
      })
      seek = -1
    }
    that.setCurrent(index, that.time_to_sec(position), position)
    that.seek(index, seek)
  },
  //结束滑动触发
  end: function (e) {
    let arr = this.data.cc
    let index = e.currentTarget.dataset.index
    this.move(index, false)
  },
  //停止播放音频
  pauseAudio: function (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    that.data.audio.pause()
    that.setAudioType(index, false, true)
  },
  //设置音频图片状态以及滚动条可播放状态函数
  setAudioType: function (index, tag, tagSlide, ) {
    let that = this
    let arrs = that.data.cc
    arrs[index].showAudio = tag
    arrs[index].canSlider = tagSlide
    that.setData({
      cc: arrs
    })
  },
  //设置音频当前播放时间以及滚动条当前位置函数
  setCurrent: function (index, currentProcess, currentProcessNum) {
    let that = this
    let arrs = that.data.cc
    arrs[index].currentProcess = currentProcess
    arrs[index].currentProcessNum = currentProcessNum
    that.setData({
      cc: arrs
    })
  },
  //设置音频总播放时间以及滚动条总位置函数
  setTotal: function (index, totalProcess, totalProcessNum) {
    let that = this
    let arrs = that.data.cc
    arrs[index].totalProcess = totalProcess
    arrs[index].totalProcessNum = totalProcessNum
    that.setData({
      cc: arrs
    })
  },
  //设置滚动条是否滚动状态函数
  move: function (index, isMove) {
    let that = this
    let arrs = that.data.cc
    arrs[index].isMove = isMove
    that.setData({
      cc: arrs
    })
  },
  //设置音频时间点函数
  seek: function (index, seek) {
    let that = this
    let arrs = that.data.cc
    arrs[index].seek = seek
    that.setData({
      cc: arrs
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