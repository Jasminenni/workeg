import  tornado.web
import  tornado.ioloop   #IO流非阻塞式的loop
import  suds
from suds import client
from phoneorpc.phone import *

class IndexHandler(tornado.web.RequestHandler):
    # get请求，self:当前对象
    def get(self):
        print("接收用户get请求")
#         写一个消息
        self.write("Jasmine")

class UserHandler(tornado.web.RequestHandler):
    def get(self):
        print("接收用户的userindex请求")
        #跳转试图
        self.render("login.html")

class AdminHandler(tornado.web.RequestHandler):
    def post(self):
        print("接收到用户的请求")
#       区分是浏览器还是手机的请求
#       得到请求的头
        headInfo=self.request.headers
        print("请求的头目信息为：",headInfo)
        hinfo = headInfo["User-Agent"]
        print("请求的头的信息为:", hinfo)
        self.finish({"message":"完成post请求"})

class queryNamePwd(tornado.web.RequestHandler):
    def post(self):
        print("接收到用户登录注册的请求")

        method=self.get_argument("action")
        print("method-->",method)

        if method=="login":
            username=self.get_argument("username")
            userpwd=self.get_argument("userpwd")
            url="http://127.0.0.1:8100/userdataserver/user?wsdl"
            client=suds.client.Client(url)
            msg=client.service.queryNamePwd(username,userpwd)


            print("通过用户名和密码查询到的结果为：",msg)

            #通过请求的头来区分是浏览器还是手机的请求
            headerInfo=self.request.headers
            heainfo=headerInfo["User-Agent"]
            print("获取到的头为：",heainfo)
            val=checkPCorMobile(heainfo)
            print("val:",val)

            if msg=="登录成功":
                if val=="PC":
                    self.render("index.html")
                else:
                    #json格式
                    self.finish({"msg":"success"})
            else:
                if val=="PC":
                    self.render("login.html",failmsg=msg)
                else:
                    self.finish({"msg":"fail"})
        elif method=="register":
            self.render("register.html")


# 设置配置项
setings={
    "template_path":"templates",
    "static_path":"static",
    "static_url_prefix":"static",
}

# 创建一个tornado应用对象
# 包含路由
app=tornado.web.Application([(r'/user',IndexHandler),
                             (r'/query',UserHandler),
                             (r'/queryall',AdminHandler),
                             (r'/name',queryNamePwd),
                             ],**setings)

if __name__=="__main__":
    # 绑定一个监听端口，内网穿透保持一致
    app.listen(8086)
    # 启动web程序，开始监听端口连接
    tornado.ioloop.IOLoop.current().start()


