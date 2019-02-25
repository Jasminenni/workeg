import  suds
from suds import client
import json
class CacheService():
    # 全局数据区
    cachedata={} #定义一个缓存的属性{ 键：值 }

    # 构造函数
    def __init__(self):
        print("-------产生一个初始化对象--------")
    def getMenuData(self,key):
        if key in self.cachedata:
            print("缓存中有数据。。。。")
            return self.cachedata[key]
        else:
            print("缓存中没有数据。。。。")
            url = "http://127.0.0.1:8100/userdataserver/user?wsdl"
            client = suds.client.Client(url)
            menudata=client.service.queryMenu()
            print("接收到的菜单栏数据",menudata)

            jsondatas=json.loads(menudata)
            print("转换成json格式的菜单栏数据为：",jsondatas)

            self.cachedata[key]=jsondatas
            return jsondatas

