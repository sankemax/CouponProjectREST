package forNow;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import core.beans.CouponType;
import facade.CouponClientFacade;


public class Utility {
	
	public static CouponClientFacade getFacade(HttpServletRequest request) throws ExceptionREST{
		HttpSession session = request.getSession(false);
		
		
		CouponClientFacade couponClientFacade = null;
		
		if(session == null){
			throw new ExceptionREST(ExceptionREST.NO_CONNECTION, 500);
		}
		couponClientFacade = (CouponClientFacade)session.getAttribute("facade");
		return couponClientFacade;
	}
	
	
	public CouponType[] getCouponTypes(){
		return CouponType.values();
	}
	
	

}
