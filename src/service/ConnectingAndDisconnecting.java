package service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import core.CouponSystem;
import core.CouponSystemException;
import facade.CouponClientFacade;
import utilities.LoginBean;
import utilities.MainUtility;

@Path("/connecting")
public class ConnectingAndDisconnecting {
	
	private CouponClientFacade couponClientFacade;
	private CouponSystem couponSystem;
	@Context private HttpServletRequest request;
	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> login(LoginBean login) throws CouponSystemException {

		Map<String, String> map = new HashMap<>();
		HttpSession session = request.getSession(false);
		
		if (session != null) {
			
			session.setAttribute("facade", null);
			session.invalidate();
		}
		
		final int  _30MinsInSec = 60*30;
		session = request.getSession(true);
		session.setMaxInactiveInterval(_30MinsInSec);
		
		couponSystem = MainUtility.getCouponSystemInstance();
		if (couponSystem != null) {
			couponClientFacade = couponSystem.login(login.getName(), login.getPassword(), login.getType());
		}
		map.put("success", login.getName());
		map.put("role", login.getType().toString().toLowerCase());
			
		session.setAttribute("facade", couponClientFacade);
		return map;
	}
	
	@GET
	@Path("/logout")
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> logOut() {

		Map<String, String> map = new HashMap<>();
		HttpSession session = request.getSession(false);
		if (session != null) {
			
			session.setAttribute("facade", null);
			session.invalidate();
			map.put("success", "logged out");
			
		} else {
			map.put("success", "logged out (no login existed)");
		}
		return map;
	}

}
