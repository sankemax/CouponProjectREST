package utilities;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import core.CouponSystem;
import core.CouponSystemException;

public class CouponContextListener implements ServletContextListener {

	public CouponContextListener() {}
	
	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		try {
			System.out.println("coupon system shutting down");
			CouponSystem.getInstance().shutdown();
		} catch (CouponSystemException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {

		try {
			CouponSystem.getInstance();
			System.out.println("coupon system started");
		} catch (CouponSystemException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
