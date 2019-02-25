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
	
	//1.��ѯѧ�����е���Ů���� (��״ͼ)
	public String querySex();
	
	//2.ͳ��ѧ�����˼��ſ� 
	public String  queryStuKmCount();
	
	//3.ͳ��ѧ�����ڵأ�����ͼ��
	public String queryAddress();
	
	// 4.ͳ��ѧ���еĸ���״̬���ж���ѧ��
	public String queryState();
	
	//5.ͳ��ÿ���༶����Ů�������ٷֱȲ����״ͼ��
	public String queryClassSex();
	
	//6.ͳ�Ƹ����༶��ѧ������
	public String queryClassCount();
	
	//7.ͳ��ѧ�������ְλ������
	public String queryJobCount();
	
	//8.��ѯÿ�����ϵı���
	public String queryNameData();
	
	//9.��ѯÿ����������
	public String queryNameCount();
	
//	public String querykmCount();
}
