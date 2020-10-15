/**
 * 
 */
package com.springboot.forum.controllers;

import com.github.pagehelper.PageInfo;
import com.springboot.forum.entity.Client;
import com.springboot.forum.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Random;


/**
 * 顾客登录和注册
 * @author 何金龙
 *
 */
@RestController
public class ClientController {


	public static int CHECKNUM = -123456;
	public static final String CURRENT_USER = "CURRENTUSER";
	@Autowired
	private ClientService service;

	/**
	 * 删除产品
	 *
	 * @param clientid
	 * @returnint
	 */
	@RequestMapping("/delclient")
	public boolean doDelClientById(int clientid) {
		return service.deleteClientById(clientid);
	}

	@PostMapping("/getallusers")
	public PageInfo<Client> doGetallusers(Client client, int pageNum, int pageSize){
		return service.searchClient(client, pageNum, pageSize);
	}

	/**
	 * 获取当前登录用户的信息
	 * @param session
	 * @return
	 */
	@RequestMapping("/getcuruser")
	public Client doGetCurrentClient(HttpSession session) {
		return (Client) session.getAttribute(CURRENT_USER);
	}
	
	/**
	 * 修改资料
	 * @param client
	 * @return
	 */
	@RequestMapping("/modclient")
	public boolean doModifyUser(Client client) {
		return service.modClient(client);
	}
	
	/**
	 * 检查用户名时可用
	 * 
	 * @param client
	 * @return true
	 */
	@RequestMapping("/checkclientname")
	public boolean doCheckName(Client client) {
		return service.checkClientname(client.getClientname());

	}

	/**
	 * 处理注册请求的方法
	 * 
	 * @param client
	 * @return
	 */

	@PostMapping("/clientreg")
	public boolean doReg(Client client) {
		return service.addClient(client);
	}

	/**
	 * 用来处理用户登录请求的方法
	 * 
	 * @param client
	 * @param session
	 * @return
	 */

	@PostMapping("/clientlogin")
	public Client doLogin(Client client, HttpSession session) {
		
		Client result = service.checkLogin(client);
	
		if (null != result) {
			
			session.setAttribute(CURRENT_USER, result);
			return result;
		} else {
			
			return new Client();
		}

	}

	@PostMapping("/sendemail")
	public void doSendEmail(String email) {
		Random random = new Random(47);
		int checkNum = random.nextInt(100000);
		CHECKNUM = checkNum;
		service.sendEmail(email,checkNum);
	}

	@PostMapping("/resetpwd")
	public boolean doResetPwd(String pwd, String email, Integer checkNum) {
		return service.resetPwd(pwd,email,checkNum);
	}

}
