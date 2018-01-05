var http = require("http")            //提供web服务  
var url = require("url")            //解析GET请求  
var query = require("querystring")    //解析POST请求
var exec = require('child_process').exec

//服务

var server = function(request,response){  
    //定义报文头
    response.writeHead(200,{"Content-Type":"text/json"})
    //判断是GET/POST请求
    if(request.method == "GET"){
        
        var params = [];
        params = url.parse(request.url,true).query
        compute(params);
        console.log(params)
        response.write(JSON.stringify(params))
        response.end();
    }else{
        
        var postdata = "";
        request.addListener("data",function(postchunk){

            postdata += postchunk
        })

        //POST结束输出结果
        request.addListener("end",function(){
            // var params = query.parse(postdata)
            // params['project_id'] = compute(params)
            var params = JSON.parse(postdata)
            // 执行git pull
            compute(params)
            console.log(params)
            // response.write(JSON.stringify(params))
            response.end()
        })
    }

}

//计算
var compute = function(params){  
    switch(+params['project_id']){
        case 11721:
            exec("chmod 777 ./hook.sh") 
            exec("./hook.sh", function(err, stdout, stderr) {
                if(err){
                    console.log('<10.199.148.172> git pull 发生错误')
                    console.log(err,stderr)
                }else{
                    console.log(stdout)
                    // return stdout
                }
            })
            
            break
        
    }
}

//开启服务在127.0.0.1:3000
http.createServer(server).listen(3011)
console.log("Server start!") 
