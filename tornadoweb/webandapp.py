import  tornado.web
import  tornado.ioloop   #IO流非阻塞式的loop
import  suds
from suds import client
from phoneorpc.phone import *
from  phoneorpc.cachedemo import *

class UserHandler(tornado.web.RequestHandler):
    def get(self):
        print("接收用户的userindex请求")
        #跳转试图
        self.render("login.html",failmsg=None)


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

                # 从缓存中获取策略 内部缓存
                cacheService=CacheService()
                jsondatas=cacheService.getMenuData("tmenu")
                if val=="PC":
                    self.render("index.html",contentdata=jsondatas)
                else:
                    #json格式
                    self.finish({"msg":"success","contentdata":jsondatas})
            else:
                if val=="PC":
                    self.render("login.html",failmsg=msg)
                else:
                    self.finish({"msg":"fail"})
        elif method=="register":
            self.render("register.html")

#业务报表
class AntvHandler(tornado.web.RequestHandler):
#          2.统计学生修了几门课 （饼图）
        def post(self):
            method = self.get_argument("action")
            print("method-->", method)

            url = "http://127.0.0.1:8100/userdataserver/user?wsdl"
            client = suds.client.Client(url)
            print("接收到统计学生修了几门课 （饼图）")
            if method=="querystukmcount":

                msg = client.service.queryStuKmCount()
                print("得到的学生选修的课程数量为："+msg)
                jsondatas=json.loads(msg)
                self.finish({"jsondata":jsondatas})

            elif method=="querysex":
                print("统计学生男女比例（柱状图）")
                msg=client.service.querySex()
                print("得到的学生男女比例为："+msg)
                jsondatas = json.loads(msg)
                self.finish({"jsondata": jsondatas})
            elif method=="queryaddress":
                print("统计学生所在地")
                msg = client.service.queryAddress()
                print("得到的学生男女比例为：" + msg)
                jsondatas = json.loads(msg)
                self.finish({"jsondata": jsondatas})
            elif method=="querystate":
                print("统计学生表中的在校状态")
                msg = client.service.queryState()
                print("得到的学生表中的在校状态：" + msg)
                jsondatas = json.loads(msg)
                self.finish({"jsondata": jsondatas})
            elif method=="queryclasssex":
                print("统计学生表中班级男女比例")
                msg = client.service.queryClassSex()
                print("得到的学生表中班级男女比例：" + msg)
                jsondatas = json.loads(msg)
                self.finish({"jsondata": jsondatas})
            elif method=="queryclasscount":
                print("统计各个班级的学生数量")
                msg = client.service.queryClassCount()
                print("得到各个班级的学生数量：" + msg)
                jsondatas = json.loads(msg)
                self.finish({"jsondata": jsondatas})
            elif method=="queryjobcount":
                print("统计学生表各个职位的人数")
                msg = client.service.queryJobCount()
                print("得到学生表各个职位的人数：" + msg)
                jsondatas = json.loads(msg)
                self.finish({"jsondata": jsondatas})
            elif method=="querynamedata":
                print("查询每个姓氏的比率")
                msg = client.service.queryNameData()
                print("得到每个姓氏的比率：" + msg)
                jsondatas = json.loads(msg)
                self.finish({"jsondata": jsondatas})
            elif method=="querynamecount":
                print("查询每个姓氏的人数")
                msg = client.service.queryNameCount()
                print("得到每个姓氏的人数：" + msg)
                jsondatas = json.loads(msg)
                self.finish({"jsondata": jsondatas})

            elif method=="querynamekname":
                print("查询每个同学的科目")
                msg = client.service.querykmCount()
                print("得到每个同学的科目：" + msg)
                jsondatas = json.loads(msg)
                self.finish({"jsondata": jsondatas})

# 设置配置项
setings={
    "template_path":"templates",
    "static_path":"static",

}

# 创建一个tornado应用对象
# 包含路由
app=tornado.web.Application([(r'/',UserHandler),
                             (r'/name',queryNamePwd),
                             (r'/antv',AntvHandler)
                             ],**setings)

if __name__=="__main__":
    # 绑定一个监听端口，内网穿透保持一致
    app.listen(8086)
    # 启动web程序，开始监听端口连接
    tornado.ioloop.IOLoop.current().start()
