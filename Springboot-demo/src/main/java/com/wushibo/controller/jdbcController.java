package com.wushibo.controller;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/sql")
public class jdbcController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PostMapping("/register")
    public String register(@RequestBody JSONObject req){
        String username=req.getString("name");
        String passwd=req.getString("passwd");
        try{
            String sql="INSERT INTO users(name,passwd)VALUES (?,?)";
            jdbcTemplate.update(sql,username,passwd);
            return "success";
        }catch (Exception e){
            return "failed-demo";
        }
    }
    @PostMapping("/login")
    public String login(@RequestBody JSONObject req){
        String username=req.getString("name");
        String passwd=req.getString("passwd");
        try{
            String sql="select * from users where name="+"\""+username+"\"";
            List<Map<String,Object>>maps=jdbcTemplate.queryForList(sql);
            if(maps.size()==0){
                return "no user";
            }
            if(maps.size()==1){
                String pwd= (String) maps.get(0).get("passwd");
                System.out.println(maps.get(0)+" "+pwd);
                if(pwd.equals(passwd)){
                    return "success";
                }else{
                    return "password error";
                }
            }else{
                return "known error1";
            }
        }catch (Exception e){
            return "known error2";
        }
    }
}
