package forNow;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;

import core.ClientType;
import core.CouponSystem;
import core.CouponSystemException;
import facade.CouponClientFacade;

@Path("/Connecting")
public class ConnectingAndDisconnecting {
	
	CouponClientFacade couponClientFacade;
	CouponSystem couponSystem;
	
	
	public ConnectingAndDisconnecting() throws CouponSystemException {
		couponSystem = CouponSystem.getInstance();
	}
	
	@Context
	HttpServletRequest request;
	
	@POST
	@Path("/login")
	public Map<Integer, String> login(@QueryParam("name")String name, @QueryParam("password")String password,
			@QueryParam("type")ClientType type){
		Map<Integer, String> map = new HashMap<>();
		HttpSession session = request.getSession(true);
		
		try {
			couponClientFacade = couponSystem.login(name, password, type);
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		}
		session.setAttribute("facade", couponClientFacade);
		map.put(200, "ok");
		return map;
	}
	
	@POST
	@Path("/logOut")
	public Map<Integer, String> logOut(){
		Map<Integer, String> map = new HashMap<>();
		HttpSession session = request.getSession(false);
		if(session != null){
			session.invalidate();
		}
		map.put(200, "ok");
		return map;
	}

}
