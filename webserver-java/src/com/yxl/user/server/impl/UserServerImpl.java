package com.yxl.user.server.impl;

import java.util.List;

import javax.jws.WebService;

import com.alibaba.fastjson.support.spring.FastJsonJsonView;
import com.yxl.user.dao.DB;
import com.yxl.user.model.Menu;
import com.yxl.user.model.Role;
import com.yxl.user.model.SexJabean;
import com.yxl.user.server.interfaces.IUserService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@WebService(portName="userservice",serviceName="UserServiceImpl",
targetNamespace="http://jasmine.com/wsdl",
endpointInterface="com.yxl.user.server.interfaces.IUserService")
public class UserServerImpl implements IUserService
{

	@Override
	public String queryRoleData() {
		// TODO Auto-generated method stub
		
		DB db = new DB();
		List<Role> list= db.queryRoleData();
		
		JSONArray array=new JSONArray();
		for(Role role:list)
		{
			JSONObject obj=new JSONObject();
			obj.put("id", role.getRid());
			obj.put("rname", role.getRname());
			array.add(obj);
		}

//		System.out.println("���ݳ���Ϊ��"+list.size());
		
		System.out.println("��ɫ��ת��JSON�������Ϊ"+array.toString());
		return array.toString();
	}

	@Override
	public String querysexData() {
		// TODO Auto-generated method stub
		DB db = new DB();
		List<SexJabean> lists=db.querysexData();
		
		JSONArray array=new JSONArray();
		for(SexJabean sex:lists)
		{
			JSONObject obj=new JSONObject();
			obj.put("sex",sex.getSsex());
			obj.put("scount",sex.getCount());
			array.add(obj);
		}
		
		System.out.println("��Ů����ת����JSON��ʽ�������Ϊ"+array.toString());
		return array.toString();
	}

	@Override
	public String querykmCount(String name)
	{
		// TODO Auto-generated method stub
		
		DB db=new DB();
		String datas= db.querykmCount(name);
		
		System.out.println("��Ŀ���ݣ�"+datas);
		return datas;
	}

	@Override
	public String queryNamePwd(String name, String pwd)
	{
		// TODO Auto-generated method stub
		DB db=new DB();
		int count=db.queryNamePwd(name, pwd);
//		System.out.println(count);
		String data="";
		if(count==1)
		{
			data="��¼�ɹ�";
		}
		else
		{
			data="��¼ʧ�ܣ�";
		}
		return data;
	}

	@Override
	public String queryMenu()
	{
		// TODO Auto-generated method stub
		DB db=new DB();
		List<Menu> lists = db.queryMenu();
		
		
		// alibaba��json
		String strJson = com.alibaba.fastjson.JSONArray.toJSONString(lists);

		System.out.println("strJson-->" + strJson);

		return strJson;
	
	}

	@Override
	public String queryStuKmCount()
	{
		// TODO Auto-generated method stub
		
		DB db=new DB();
		List datas=db.queryStuKmCount();
		
		// alibaba��json
		String strJson = com.alibaba.fastjson.JSONArray.toJSONString(datas);
		System.out.println("---->"+strJson);
		return strJson;
	}
	
	
	@Override
	public String querySex()
	{
		// TODO Auto-generated method stub
		
		DB db=new DB();
		List datas=db.querySex();
		
		// alibaba��json
		String strJson = com.alibaba.fastjson.JSONArray.toJSONString(datas);
		System.out.println("---->"+strJson);
		return strJson;
	}
	
	@Override
	public String queryAddress()
	{
		// TODO Auto-generated method stub
		DB db=new DB();
		List datas=db.queryAddress();
		
		// alibaba��json
		String strJson = com.alibaba.fastjson.JSONArray.toJSONString(datas);
		System.out.println("---->"+strJson);
		return strJson;
	}
		
	@Override
	public String queryState()
	{
		// TODO Auto-generated method stub
		DB db=new DB();
		List datas=db.queryState();
		
		// alibaba��json
		String strJson = com.alibaba.fastjson.JSONArray.toJSONString(datas);
		System.out.println("---->"+strJson);
		return strJson;		
	}
	
	@Override
	public String queryClassSex()
	{
		// TODO Auto-generated method stub
		DB db=new DB();
		List datas=db.queryClassSex();
		
		String strJson = com.alibaba.fastjson.JSONArray.toJSONString(datas);
		System.out.println("---->"+strJson);
		return strJson;	
		
	}
	
	@Override
	public String queryClassCount()
	{
		// TODO Auto-generated method stub
		DB db=new DB();
		List datas=db.queryClassCount();
		
		String strJson = com.alibaba.fastjson.JSONArray.toJSONString(datas);
		System.out.println("---->"+strJson);
		return strJson;	
		
	}
	@Override
	public String queryJobCount()
	{
		DB db=new DB();
		List datas=db.queryJobCount();
		
		String strJson = com.alibaba.fastjson.JSONArray.toJSONString(datas);
		System.out.println("---->"+strJson);
		return strJson;	
	}
	@Override
	public String queryNameData()
	{
		DB db=new DB();
		List datas=db.queryNameData();
		
		String strJson = com.alibaba.fastjson.JSONArray.toJSONString(datas);
		System.out.println("---->"+strJson);
		return strJson;	
	}
	@Override
	public String queryNameCount()
	{
		DB db=new DB();
		List datas=db.queryNameCount();
		
		String strJson = com.alibaba.fastjson.JSONArray.toJSONString(datas);
		System.out.println("---->"+strJson);
		return strJson;	
	}
//	@Override
//	public String querykmCount()
//	{
//		DB db=new DB();
//		List datas=db.querykmCount();
//		
//		String strJson = com.alibaba.fastjson.JSONArray.toJSONString(datas);
//		System.out.println("---->"+strJson);
//		return strJson;	
//	}
//	public static void main(String[] args)
//	{
//		UserServerImpl u = new UserServerImpl();
//		u.querykmCount();
//	}



}
