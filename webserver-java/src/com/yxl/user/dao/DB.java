package com.yxl.user.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.yxl.profile.ProFileImg;
import com.yxl.user.model.ClassSex;
import com.yxl.user.model.IntString;
import com.yxl.user.model.Menu;
import com.yxl.user.model.NameKm;
import com.yxl.user.model.Role;
import com.yxl.user.model.SexJabean;

public class DB
{
	private Connection conn;
	private Connection conn1;
	
	static String  urlimg="";
	
	
	static
	{
		urlimg=ProFileImg.getImagePath();
		System.out.println(urlimg);
	}
	public DB()
	{
		try
		{
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql:" + "//127.0.0.1:3306/demo1", "root", "123");
			// System.out.println("连接到数据库："+conn);
			conn1=DriverManager.getConnection("jdbc:mysql:" + "//127.0.0.1:3306/demo2", "root", "123");
		}
		catch (ClassNotFoundException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void closeconn()
	{
		if (null != conn)
		{
			try
			{
				conn.close();
			}
			catch (SQLException e)
			{
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	public List queryRoleData()
	{
		String sql = "select * from t_role";

		List<Role> lists = new ArrayList<Role>();
		PreparedStatement prt;
		try
		{
			prt = conn.prepareStatement(sql);
			ResultSet rs = prt.executeQuery();

			while (rs.next())
			{
				Role r = new Role();
				r.setRid(rs.getInt(1));
				r.setRname(rs.getString(2));
				lists.add(r);
			}
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		closeconn();
		return lists;
	}

	// 查询学生表中的男女比例
	public List querysexData()
	{
		String sql = "select ssex,count(ssex) AS COUNT  from t_stus group by ssex";

		List<SexJabean> list = new ArrayList<SexJabean>();

		try
		{
			PreparedStatement prt = conn.prepareStatement(sql);

			ResultSet rs = prt.executeQuery();

			while (rs.next())
			{
				SexJabean j = new SexJabean();
				j.setSsex(rs.getString(1));
				j.setCount(rs.getInt(2));
				list.add(j);
			}

		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		closeconn();
		return list;
	}

	//查询某个学生选修了几门科目
	public String querykmCount(String name)
	{
		String sql = "SELECT COUNT(kid),sname  FROM "
				+ "(SELECT   * FROM  t_stus  WHERE  sname=?) tmp "
				+ "INNER  JOIN t_score  ON tmp.sid=t_score.sid  GROUP  BY sname";
		String data="";
		
		try
		{
			PreparedStatement prt = conn.prepareStatement(sql);
			prt.setString(1, name);
			ResultSet rs = prt.executeQuery();
			
			while(rs.next())
			{
				data=rs.getInt(1)+","+rs.getString(2);
			}
//			System.out.println(data);
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		closeconn();
		return data;
	}
	
	public int queryNamePwd(String name,String pwd)
	{
		String sql="SELECT COUNT(*) FROM t_stus WHERE sname=? AND spwd=?";
		int count=0;
		try
		{
			PreparedStatement prt=conn.prepareStatement(sql);
			prt.setString(1, name);
			prt.setString(2, pwd);
			ResultSet rs=prt.executeQuery();
			
			while(rs.next())
			{
				count= rs.getInt(1);
			}
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		closeconn();
		return count;	
	}
	
	//查询菜单栏数据
	public List<Menu> queryMenu()
	{
		String sql="SELECT m_id,m_class,m_url,m_img FROM t_menu";
		List<Menu> lists= new ArrayList<Menu>();
		try
		{
			PreparedStatement prt=conn1.prepareStatement(sql);
			ResultSet rs=prt.executeQuery();
			
			while(rs.next())
			{
				Menu m= new Menu();
				m.setM_id(rs.getInt(1));
				m.setM_class(rs.getString(2));
				m.setM_url(rs.getString(3));
				m.setM_img(urlimg+rs.getString(4));
				lists.add(m);
			}
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//		System.out.println(lists);
		closeconn();
		return lists;
	}
	
	public List queryStuKmCount()
	{
		String sql="SELECT COUNT(kid),sname  FROM (SELECT   * FROM  t_stus  GROUP BY sname) tmp "
				+ "INNER  JOIN t_score  ON tmp.sid=t_score.sid  GROUP  BY sname";
		List<Role> lists= new ArrayList<Role>();
		try
		{
			PreparedStatement prt=conn.prepareStatement(sql);
			ResultSet rs=prt.executeQuery();
			
			while(rs.next())
			{
				Role m=new Role();
				m.setRid(rs.getInt(1));
				m.setRname(rs.getString(2));
				lists.add(m);			
			}
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		closeconn();
		return lists;
	}
	
	public List querySex()	
	{
		String sql="SELECT COUNT(ssex),ssex   FROM t_stus GROUP BY ssex";
		
		List<IntString> lists = new ArrayList<IntString>();

		PreparedStatement prt;
		try
		{
			prt = conn.prepareStatement(sql);
			ResultSet rs=prt.executeQuery();
			while(rs.next())
			{
				IntString in=new IntString();
				in.setCount(rs.getInt(1));
				in.setName(rs.getString(2));
				lists.add(in);			
			}
			
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		closeconn();
		return lists;
	}
	
	public List queryAddress()
	{
		String sql="SELECT COUNT(*),IFNULL(saddress,'未知地') AS address FROM t_stus GROUP BY saddress";
		List<IntString> lists = new ArrayList<IntString>();
		
		PreparedStatement prt;
		try
		{
			prt = conn.prepareStatement(sql);
			ResultSet rs=prt.executeQuery();
			while(rs.next())
			{
				IntString in=new IntString();
				in.setCount(rs.getInt(1));
				in.setName(rs.getString(2));
				lists.add(in);			
			}
			
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		closeconn();
		return lists;		
	}
	
	public List queryState()
	{
		String sql="SELECT COUNT(state),aname FROM t_stus s INNER JOIN t_state a "
				+ "ON s.state=a.aid GROUP BY state";
		List<IntString> lists = new ArrayList<IntString>();
		
		PreparedStatement prt;
		try
		{
			prt = conn.prepareStatement(sql);
			ResultSet rs=prt.executeQuery();
			while(rs.next())
			{
				IntString in=new IntString();
				in.setCount(rs.getInt(1));
				in.setName(rs.getString(2));
				lists.add(in);			
			}			
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		closeconn();
		return lists;			
	}

	public List  queryClassSex()
	{
		String sql="SELECT  COUNT(ssex),ssex,cname FROM t_stus s RIGHT JOIN t_classes c "
				+ "ON  s.scid =c.cid GROUP BY cname,ssex";
		List<ClassSex> list = new ArrayList<ClassSex>();
		
		try
		{
			PreparedStatement prt =conn.prepareStatement(sql);
			ResultSet rs=prt.executeQuery();
			
			while(rs.next())
			{
				ClassSex c = new ClassSex();
				c.setCount(rs.getInt(1));
				c.setSex(rs.getString(2));
				c.setName(rs.getString(3));
				list.add(c);
			}
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		closeconn();
		return list;
	}
	
	public List queryClassCount()
	{
		String sql="SELECT COUNT(*),cname FROM t_stus s INNER JOIN  t_classes c ON s.scid=c.cid GROUP BY cname";
		List<IntString> lists = new ArrayList<IntString>();
		
		PreparedStatement prt;
		try
		{
			prt = conn.prepareStatement(sql);
			ResultSet rs=prt.executeQuery();
			while(rs.next())
			{
				IntString in=new IntString();
				in.setCount(rs.getInt(1));
				in.setName(rs.getString(2));
				lists.add(in);			
			}			
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		closeconn();
		return lists;	
	}
	public List queryJobCount()
	{
		String sql="SELECT COUNT(sjob),rname FROM t_stus s INNER JOIN t_role r ON  s.sjob=r.rid GROUP BY rname";
		List<IntString> lists = new ArrayList<IntString>();
		
		PreparedStatement prt;
		try
		{
			prt = conn.prepareStatement(sql);
			ResultSet rs=prt.executeQuery();
			while(rs.next())
			{
				IntString in=new IntString();
				in.setCount(rs.getInt(1));
				in.setName(rs.getString(2));
				lists.add(in);			
			}			
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		closeconn();
		return lists;	
	}
	
	public List queryNameData()
	{
		String sql="SELECT  FORMAT(COUNT(*)/(SELECT  COUNT(*) FROM t_stus),1), "
				+ "SUBSTR(sname,1,1) FROM  t_stus  GROUP  BY  SUBSTR(sname,1,1)";
		List<IntString> lists = new ArrayList<IntString>();
		
		PreparedStatement prt;
		try
		{
			prt = conn.prepareStatement(sql);
			ResultSet rs=prt.executeQuery();
			while(rs.next())
			{
				IntString in=new IntString();
				in.setCount(rs.getDouble(1));
				in.setName(rs.getString(2));
				lists.add(in);			
			}			
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		closeconn();
		return lists;	
		
	}
	
	public List queryNameCount()
	{
		String sql="SELECT COUNT(*), SUBSTR(sname,1,1)  FROM  t_stus  GROUP  BY  SUBSTR(sname,1,1)";
		List<IntString> lists = new ArrayList<IntString>();
		
		PreparedStatement prt;
		try
		{
			prt = conn.prepareStatement(sql);
			ResultSet rs=prt.executeQuery();
			while(rs.next())
			{
				IntString in=new IntString();
				in.setCount(rs.getInt(1));
				in.setName(rs.getString(2));
				lists.add(in);			
			}			
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		closeconn();
		return lists;	
	}
	public List querykmCount()
	{
		String sql="SELECT sname,kname FROM t_stus INNER JOIN t_km "
				+ "ON t_stus.`skid`=t_km.`kid` GROUP BY sname";
		
		List<NameKm> lists=new ArrayList<NameKm>();
		
		try
		{
			PreparedStatement prt = conn.prepareStatement(sql);
			ResultSet rs=prt.executeQuery();
			while(rs.next())
			{
				NameKm in=new NameKm();
				in.setSname(rs.getString(1));
				in.setKname(rs.getString(2));
				lists.add(in);
			}			
		}
		catch (SQLException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		closeconn();
		return lists;
		
	}
//	public static void main(String[] args)
//	{
//		DB db = new DB();
//		db.queryMenu();
//	}
}
