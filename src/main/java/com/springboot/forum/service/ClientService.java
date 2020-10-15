/**
 * 
 */
package com.springboot.forum.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import java.util.Random;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.extra.mail.MailAccount;
import cn.hutool.extra.mail.MailUtil;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.springboot.forum.controllers.ClientController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.forum.dao.ClientMapper;
import com.springboot.forum.entity.Client;
import com.springboot.forum.entity.ClientExample;
import com.springboot.forum.entity.ClientExample.Criteria;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


/**
 * 顾客登录和注册
 * @author 何金龙
 *
 */
@Service
public class ClientService {
	
	
	@Autowired
	private ClientMapper clientMapper;

	/**
	 * 修改客户资料
	 * @param client
	 * @return
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean modClient(Client client) {
			
		ClientExample example=new ClientExample();
		Criteria cc=example.createCriteria();
	
		cc.andClientnameEqualTo(client.getClientname());
		cc.andClientidEqualTo(client.getClientid());
		
		List<Client> list=clientMapper.selectByExample(example);

		int i=clientMapper.updateByPrimaryKeySelective(client);
		return i>0;
	}
	/**
	 * 检查登录是否OK
	 * @param client
	 * @return
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public Client checkLogin(Client client) {
		ClientExample example = new ClientExample();
		Criteria cc = example.createCriteria();
	
		cc.andClientnameEqualTo(client.getClientname());
	
		cc.andClientpwdEqualTo(client.getClientpwd());
	
		List<Client> list = clientMapper.selectByExample(example);
	
		if (list.size() > 0) {
			Client client1 =  list.get(0);
			Date date = new Date();

			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");

			String time = df.format(date);
			client1.setLogintime(time);
			modClient(client1);
			return client1;

		} else {
	
			return null;
		}

	}

	/**
	 * 添加新用户
	 * 
	 * @param client
	 * @return true 则添加成功，反之没有成功
	 * 
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean addClient(Client client) {
		boolean isOK = checkClientname(client.getClientname());
		if (!isOK) {
			
			return false;
		}
		
		clientMapper.insert(client);
		return true;
	}

	/**
	 * 添加新登录时间
	 *
	 * @param
	 * @return true 则添加成功，反之没有成功
	 *
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean logintime(Logintime logintime) {
		boolean isOK = checkTimeid(logintime.getLogintime());
		if (!isOK) {

			return false;
		}

		clientMapper.insert(logintime);
		return true;
	}

	private boolean checkLogintime(String logintime) {
	}*/

	@Transactional(propagation = Propagation.SUPPORTS)
	public List<Client> searchAllUsers(){
		return clientMapper.selectByExample(null);
	}
	/**
	 * 检查用户名是否可用
	 * 
	 * @param
	 * @return true/false
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean checkClientname(String username) {
		
		ClientExample example = new ClientExample();
		Criteria cc = example.createCriteria();
		
		cc.andClientnameEqualTo(username);
		List<Client> list = clientMapper.selectByExample(example);
		return list.size() == 0;
	}

	/**
	 * 根据id删除产品
	 * @param
	 * @return 是否删除成功
	 */
	public boolean deleteClientById(int clientid) {
		int num = clientMapper.deleteByPrimaryKey(clientid);

		return num>0;

	}

	/**
	 * 实现动态条件分页查询功能
	 * @param client 查询条件
	 * @param pageNum 当前页数
	 * @param pageSize 每页查询的记录条数
	 * @return 返回是由pageHelper插件封装了分页信`息和分页查询结果集的PageInfo对象
	 */

	public PageInfo<Client> searchClient(Client client, int pageNum, int pageSize){
		ClientExample example = new ClientExample();
		Criteria cc = example.createCriteria();
		if (null != client.getClientid()) {
			//添加id查询条件
			cc.andClientidEqualTo(client.getClientid());
		}
		if (null != client.getClientname() && !"".equals(client.getClientname())) {
			//添加产品名条件
			cc.andClientnameLike("%"+client.getClientname()+"%");
		}
		if (null != client.getClientpwd() && !"".equals(client.getClientpwd())) {
			//添加设备id条件
			cc.andClientpwdEqualTo(client.getClientpwd());
		}
		if (null != client.getClientemail() && !"".equals(client.getClientemail())) {
			//添加产品名条件
			cc.andClientemailEqualTo(client.getClientemail());
		}
		if (null != client.getClientright() && !"".equals(client.getClientright())) {
			//添加设备id条件
			cc.andClientrightEqualTo(client.getClientright());
		}
		if (null != client.getLogintime() && !"".equals(client.getLogintime())) {
			//添加设备id条件
			cc.andLogintimeEqualTo(client.getLogintime());
		}



		//启动分页插件
		PageHelper.startPage(pageNum,pageSize);
		//不要添加任何代码
		//实时查询
		List<Client> list = clientMapper.selectByExample(example);

		//返回值
		return new PageInfo<Client>(list);

	}

	/**
	 *
	 * @param email
	 */
	public void sendEmail(String email,int checkNum) {

		MailUtil.send(email, "验证码", "<head>\n" +
				"    <base target=\"_blank\" />\n" +
				"    <style type=\"text/css\">::-webkit-scrollbar{ display: none; }</style>\n" +
				"    <style id=\"cloudAttachStyle\" type=\"text/css\">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style>\n" +
				"    <style id=\"blockquoteStyle\" type=\"text/css\">blockquote{display:none;}</style>\n" +
				"    <style type=\"text/css\">\n" +
				"        body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}\n" +
				"        td, input, button, select, body{font-family:Helvetica, 'Microsoft Yahei', verdana}\n" +
				"        pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}\n" +
				"        th,td{font-family:arial,verdana,sans-serif;line-height:1.666}\n" +
				"        img{ border:0}\n" +
				"        header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}\n" +
				"        blockquote{margin-right:0px}\n" +
				"    </style>\n" +
				"</head>\n" +
				"<body tabindex=\"0\" role=\"listitem\">\n" +
				"<table width=\"700\" border=\"0\" align=\"center\" cellspacing=\"0\" style=\"width:700px;\">\n" +
				"    <tbody>\n" +
				"    <tr>\n" +
				"        <td>\n" +
				"            <div style=\"width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;\">\n" +
				"                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"700\" height=\"39\" style=\"font:12px Tahoma, Arial, 宋体;\">\n" +
				"                    <tbody><tr><td width=\"210\"></td></tr></tbody>\n" +
				"                </table>\n" +
				"            </div>\n" +
				"            <div style=\"width:680px;padding:0 10px;margin:0 auto;\">\n" +
				"                <div style=\"line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;\">\n" +
				"                    <strong style=\"display:block;margin-bottom:15px;\">尊敬的用户" +email+
				":<span style=\"color:#f60;font-size: 16px;\"></span>您好！</strong>\n" +
				"                    <strong style=\"display:block;margin-bottom:15px;\">\n" +
				"                        您正在进行<span style=\"color: red\">重设密码</span>操作，请在验证码输入框中输入：<span style=\"color:#f60;font-size: 24px\">" +
				checkNum +
				"</span>，以完成操作。\n" +
				"                    </strong>\n" +
				"                </div>\n" +
				"                <div style=\"margin-bottom:30px;\">\n" +
				"                    <small style=\"display:block;margin-bottom:20px;font-size:12px;\">\n" +
				"                        <p style=\"color:#747474;\">\n" +
				"                            注意：此操作可能会修改您的密码、登录邮箱或绑定手机。如非本人操作，请及时登录并修改密码以保证帐户安全\n" +
				"                            <br>（工作人员不会向你索取此验证码，请勿泄漏！)\n" +
				"                        </p>\n" +
				"                    </small>\n" +
				"                </div>\n" +
				"            </div>\n" +
				"            <div style=\"width:700px;margin:0 auto;\">\n" +
				"                <div style=\"padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;\">\n" +
				"                    <p>此为系统邮件，请勿回复<br>\n" +
				"                        请保管好您的邮箱，避免账号被他人盗用\n" +
				"                    </p>\n" +
				"                    <p>forum网络科技团队</p>\n" +
				"                </div>\n" +
				"            </div>\n" +
				"        </td>\n" +
				"    </tr>\n" +
				"    </tbody>\n" +
				"</table>\n" +
				"</body>", true);
	}


	public boolean resetPwd(String pwd, String email, Integer checkNum) {
		if(checkNum!= ClientController.CHECKNUM || checkNum<0) {
			return false;
		}
		ClientExample example=new ClientExample();
		Criteria cc=example.createCriteria();

		cc.andClientemailEqualTo(email);

		List<Client> list=clientMapper.selectByExample(example);
		if(list.size()<=0) {
			return false;
		}
		Client client = list.get(0);
		client.setClientpwd(pwd);
		int i = clientMapper.updateByPrimaryKey(client);
		return i>0;
	}

}
