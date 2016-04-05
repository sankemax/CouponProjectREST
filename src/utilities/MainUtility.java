package utilities;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import core.CouponSystem;
import core.CouponSystemException;
import core.beans.CouponType;
import facade.CouponClientFacade;

public class MainUtility {

	public static final String IMAGE_BASE_DIR = "/CouponApp/WebContent/Images/";

	public static <T> T getFacade(HttpServletRequest request, Class<T> type) throws RestException {

		HttpSession session = request.getSession(false);
		CouponClientFacade couponClientFacade = null;
		if (session == null) {
			throw new RestException("client has no authorization for that action");
		} else {
			couponClientFacade = (CouponClientFacade) session.getAttribute("facade");
			if (couponClientFacade == null) {
				session.invalidate();
				throw new RestException("The system does not recognize the client");
			} else if (!session.getAttribute("facade").getClass().equals(type)) {
				session.invalidate();
				throw new RestException("client has no authorization for that action");
			}
		}
		return (T) couponClientFacade;
	}

	public static CouponType[] getCouponTypes() {
		return CouponType.values();
	}

	public static CouponSystem getCouponSystemInstance() {
		CouponSystem couponSystem = null;
		try {
			couponSystem = CouponSystem.getInstance();
		} catch (CouponSystemException e) {
			e.printStackTrace();
		}
		return couponSystem;
	}
}
