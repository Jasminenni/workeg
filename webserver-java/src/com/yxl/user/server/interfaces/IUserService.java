package com.yxl.user.server.interfaces;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService(targetNamespace="http://jasmine.com/wsdl")
public interface IUserService 
{
	@WebMethod
	public String queryRoleData();
	
	public String querysexData();
	
	public String querykmCount(String name);
	
	public String queryNamePwd(String name,String pwd);
	
	public String queryMenu();
	
	//1.查询学生表中的男女比例 (柱状图)
	public String querySex();
	
	//2.统计学生修了几门课 
	public String  queryStuKmCount();
	
	//3.统计学生所在地（柱形图）
	public String queryAddress();
	
	// 4.统计学生中的各个状态下有多少学生
	public String queryState();
	
	//5.统计每个班级的男女比例（百分比层叠柱状图）
	public String queryClassSex();
	
	//6.统计各个班级的学生数量
	public String queryClassCount();
	
	//7.统计学生表各个职位的人数
	public String queryJobCount();
	
	//8.查询每个姓氏的比率
	public String queryNameData();
	
	//9.查询每个姓氏人数
	public String queryNameCount();
	
//	public String querykmCount();
}
