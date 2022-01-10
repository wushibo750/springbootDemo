# springbootDemo
springboot+微信小程序，实现接口登录
# Springboot+微信小程序开发

https://www.bilibili.com/video/BV1oU4y1P7qc?from=search&seid=5166334182671134535&spm_id_from=333.337.0.0

## 微信开发者工具快捷键汇总

https://www.jianshu.com/p/d33ac0cafd19

## js语句每行结束需要加分号吗?

![img](http://mmbiz.qpic.cn/mmbiz_png/D3SCiaN7icicmPIPxRsQUoU5bbprGz5V8IKCMvVbDrCM6gxfxetsIgsVxWtdiaoaUCiajUlunbOs46paLaGAXSQ9kCA/0?wx_fmt=png)

## 视频目录

**环境搭建**

1.1 开发语言和开发工具

1.2 服务器配置

**项目准备**

2.1 微信开发者工具详解

2.2 SpringBoot简单使用

2.3SpringBoot+mysql实现用户登录

2.4SpringBoot+redis简介

2.5shiro+jwt实现token验证

2.6Swagger自动生成文档

**功能实现**

3.1小程序功能介绍与需求分析

3.2地图与图像识别

3.3开发者服务端获取openid并生成token

3.4卡片上传与审核

3.5卡片的展示与更新

3.6用户与卡片联系 收藏足迹的实现

3.7redis实现排行榜

3.8每日任务实现

**项目部署与上线**

4.1https的申请与部署

4.2SpringBoot项目打包与部署

4.3微信小程序的提交与发布



2.1 微信开发者工具详解

```JavaScript
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
```

```JavaScript
 wx.showToast({
      title: 'success wushibo',
      duration: 0,
      icon: icon,
      image: 'image',
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
```

```JavaScript
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
```

### 赋值时不要想当然地赋值，用的是‘：’ 而不是‘=’

### success()里面使用任何参数名都可以，不过一般用response

```javascript
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
  },
```

### Springboot与微信小程序数据交互

小程序端：

```javascript
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
```

Springboot端：

```java
package com.wushibo.controller;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/test")
public class testController {
    @GetMapping("/hello")
    public String func(){
        return "hello world!";
    }
    @PostMapping("upload")
    public int getResult(@RequestBody JSONObject req){  //参数为一个json格式的
        System.out.println(req);   //接收到微信小程序
        int a=req.getInteger("num1");
        int b=req.getInteger("num2");
        System.out.println(a+" "+b);
        return a+b; //返回到小程序中
    }
}
```

## 登录页面设计：

主要就是js的运用，必须要看清楚小程序一些用法

```JavaScript
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
```

```html
<view>用户名：<input bindinput="getName"></input></view>
<view>密码：<input  bindinput="getPasswd"></input></view>
<button bindtap="login">登录</button>
<button bindtap="register">注册</button>
```

```java
@RestController@RequestMapping("/api/sql")public class jdbcController {    @Autowired    private JdbcTemplate jdbcTemplate;    @PostMapping("/register")    public String register(@RequestBody JSONObject req){        String username=req.getString("name");        String passwd=req.getString("passwd");        try{            String sql="INSERT INTO users(name,passwd)VALUES (?,?)";            jdbcTemplate.update(sql,username,passwd);            return "success";        }catch (Exception e){            return "failed-demo";        }    }    @PostMapping("/login")    public String login(@RequestBody JSONObject req){        String username=req.getString("name");        String passwd=req.getString("passwd");        try{            String sql="select * from users where name="+"\""+username+"\"";            List<Map<String,Object>>maps=jdbcTemplate.queryForList(sql);            if(maps.size()==0){                return "no user";            }            if(maps.size()==1){                String pwd= (String) maps.get(0).get("passwd");                System.out.println(maps.get(0)+" "+pwd);                if(pwd.equals(passwd)){                    return "success";                }else{                    return "password error";                }            }else{                return "known error1";            }        }catch (Exception e){            return "known error2";        }    }}
```

