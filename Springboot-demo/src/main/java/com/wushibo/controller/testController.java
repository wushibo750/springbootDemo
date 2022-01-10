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
        return a+b;
    }
}
