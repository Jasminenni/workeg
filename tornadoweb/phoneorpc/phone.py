import re

def checkPCorMobile(info):
    phoneheads=["android","mac","windowphone"]
    for data in phoneheads:
        # info头里面包含的data
        val=re.search(data,info.lower())
        if val is None:
            return "PC"
        else:
            return "Mobile"