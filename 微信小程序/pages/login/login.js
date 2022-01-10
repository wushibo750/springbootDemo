Page({
  data: {
    name:'',
    passwd:''
  },
  getName(e){
      this.setData({
        name:e.detail.value,
      })
  },
  getPasswd(e){
    this.setData({
      passwd:e.detail.value,
    })
  },
  login(){
    if(!this.data.name||!this.data.passwd){  //如果为空提示
      wx.showModal({
        title: '请输入完整!',
      })
    }
    wx.request({
      url: 'http://127.0.0.1:8080/api/sql/login',
      method:'POST',
      data:{
        name:this.data.name,
        passwd:this.data.passwd
      },
      success(r){
        console.log(r);
      },
      fail: (res) => {
        console.log(res.data);
      },
    })
  },
  register(){
   if(!this.data.name||!this.data.passwd){  //如果为空提示
      wx.showModal({
        title: '请输入完整!',
      })
    }
    wx.request({
      url: 'http://127.0.0.1:8080/api/sql/register',
      method:'POST',
      data:{
        name:this.data.name,
        passwd:this.data.passwd
      },
      success(r){
        console.log(r);
      },
      fail: (res) => {
        console.log(res.data);
      },
    })

  },
      
  
})