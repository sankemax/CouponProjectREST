package service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jms.JMSException;
import javax.naming.NamingException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import core.CouponSystemException;
import core.beans.Company;
import core.beans.Customer;
import core.ejb.BusinessDelegate;
import core.ejb.Income;
import facade.AdminFacade;
import utilities.ImageUtility;
import utilities.MainUtility;
import utilities.RestException;

@Path("/admin")
public class AdminService {
	
	@Context private HttpServletRequest request;
	
	@POST
	@Path("/newcomp")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> createCompany(Company company) throws CouponSystemException, RestException {
		
		Map<String, String> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade) MainUtility.getFacade(request, AdminFacade.class);
		adminFacade.createCompany(company);
		map.put("success", "company created");
		return map;
	}
	
	@DELETE
	@Path("/removecomp")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> removeCopmany(Company company) throws RestException, CouponSystemException{

		Map<String, String> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade) MainUtility.getFacade(request, AdminFacade.class);
		ImageUtility.removeImageFromFileSystem(null, company.getId());
		adminFacade.removeCompany(company);
		map.put("success", "company deleted");
		return map;
	}
	
	@PUT
	@Path("/updcomp")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> updateCompany(Company company) throws RestException, CouponSystemException{

		Map<String, String> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade)MainUtility.getFacade(request, AdminFacade.class);
		adminFacade.updateCompany(company);
		map.put("success", "company updated");
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/company")
	public Map<String, Company> getCompany(@QueryParam("id") long id) throws RestException, CouponSystemException{

		Map<String, Company> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade)MainUtility.getFacade(request, AdminFacade.class);
		map.put("company", adminFacade.getCompany(id));
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/companies")
	public Map<String, List<Company>> gatAllCompanies() throws RestException, CouponSystemException{

		Map<String, List<Company>> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade)MainUtility.getFacade(request, AdminFacade.class);
		map.put("companies", adminFacade.getAllCompanies());
		return map;
	}
	
	@POST
	@Path("/createcust")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> createCustomer(Customer customer) throws RestException, CouponSystemException{

		Map<String, String> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade) MainUtility.getFacade(request, AdminFacade.class);
		adminFacade.createCustomer(customer);
		map.put("success", "customer created");
		return map;
	}
	
	@DELETE
	@Path("/rmcust")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> removeCustomer(Customer customer) throws RestException, CouponSystemException{
		
		Map<String, String> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade) MainUtility.getFacade(request, AdminFacade.class);
		adminFacade.removeCustomer(customer);
		map.put("success", "customer removed");
		return map;
	}
	
	@PUT
	@Path("/updatecust")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<String, String> updateCustomer(Customer customer) throws RestException, CouponSystemException{

		Map<String, String> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade) MainUtility.getFacade(request, AdminFacade.class);
		adminFacade.updateCustomer(customer);
		map.put("success", "custmer updated");
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/customer")
	public Map<String, Customer> getCustomer(@QueryParam("id") long id) throws RestException, CouponSystemException{

		Map<String, Customer> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade) MainUtility.getFacade(request, AdminFacade.class);
		map.put("customer", adminFacade.getCustomer(id));
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/customers")
	public Map<String, List<Customer>> gatAllCustomer() throws RestException, CouponSystemException{
		
		Map<String, List<Customer>> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade) MainUtility.getFacade(request, AdminFacade.class);
		map.put("customers", adminFacade.getAllCustomers());
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/custname")
	public Map<String, Customer> getCustomerByName(@QueryParam("name") String name) throws RestException, CouponSystemException{

		Map<String, Customer> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade) MainUtility.getFacade(request, AdminFacade.class);
		map.put("customer", adminFacade.getCustomerByName(name));
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/compname")
	public Map<String, Company> getCompanyByName(@QueryParam("name") String name) throws RestException, CouponSystemException{

		Map<String, Company> map = new HashMap<>();
		AdminFacade adminFacade = (AdminFacade) MainUtility.getFacade(request, AdminFacade.class);
		map.put("company", adminFacade.getCompanyByName(name));
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/allincome")
	public Map<String, Collection<Income>> getSystemIncome() throws RestException, NamingException, JMSException {
		
		Map<String, Collection<Income>> map = new HashMap<>();
		@SuppressWarnings("unused") // i call admin facade for SESSION VALIDATION LOGIC
		AdminFacade adminFacade = (AdminFacade) MainUtility.getFacade(request, AdminFacade.class);
		BusinessDelegate bd = new BusinessDelegate();
		map.put("income", bd.viewAllIncome());
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/customerincome")
	public Map<String, Collection<Income>> getCustomerIncome(@QueryParam("name") String name) throws RestException, NamingException, JMSException {
		
		Map<String, Collection<Income>> map = new HashMap<>();
		@SuppressWarnings("unused") // i call admin facade for SESSION VALIDATION LOGIC
		AdminFacade adminFacade = (AdminFacade) MainUtility.getFacade(request, AdminFacade.class);
		BusinessDelegate bd = new BusinessDelegate();
		map.put("income", bd.viewCustomerIncome(name));
		return map;
	}
}