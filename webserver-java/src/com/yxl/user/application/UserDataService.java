package com.yxl.user.application;

import javax.jws.soap.SOAPBinding;
import javax.xml.ws.Endpoint;

import com.yxl.user.server.impl.UserServerImpl;

//ʹ��webserviceͳһ���� ���ݷ��ʽӿ��м��
@SOAPBinding(style=SOAPBinding.Style.RPC)
public class UserDataService
{
	public static void main(String[] args) 
	{
		System.out.println("server��������");
		Endpoint.publish("http://127.0.0.1:8100/userdataserver/user", new UserServerImpl());
		
		System.out.println("server�˷��񷢲��ɹ�");
	}
}