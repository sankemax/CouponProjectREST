package forNow;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import javax.ws.rs.core.Response;

import core.CouponSystemException;
import core.beans.Company;
import core.beans.Customer;
import facade.AdminFacade;

@Path("/admin")
public class AdminService {
	
	
	@Context
	HttpServletRequest request;
	@Context
	HttpServletResponse response;	
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, String> createCompany(Company company){
		Map<Integer, String> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			adminFacade.createCompany(company);
		} catch (CouponSystemException e) {
			map.put(1, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
//		response = (HttpServletResponse) Response.status(404).build();
		map.put(200, "ok");
		return map;
	}
	
	@DELETE
	@Path("/RemoveCompany")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, String> removeCopmany(Company company){
		Map<Integer, String> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			adminFacade.removeCompany(company);
		} catch (CouponSystemException e) {
			map.put(2, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		map.put(200, "ok");
		return map;
	}
	
	@PUT
	@Path("/UpdateCompany")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, String> updateCompany(Company company){
		Map<Integer, String> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			adminFacade.updateCompany(company);
		} catch (CouponSystemException e) {
			map.put(3, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		map.put(200, "ok");
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/company")
	public Map<Integer, Object> getCompany(@QueryParam("id") long id){
		Map<Integer, Object> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			map.put(200, adminFacade.getCompany(id));
		} catch (CouponSystemException e) {
			map.put(4, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/companies")
	public Map<Integer, Object> gatAllCompanies(){
		Map<Integer, Object> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			map.put(200, adminFacade.getAllCompanies());
		} catch (CouponSystemException e) {
			map.put(5, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@POST
	@Path("/CreateCustomer")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, String> createCustomer(Customer customer){
		Map<Integer, String> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			adminFacade.createCustomer(customer);
		} catch (CouponSystemException e) {
			map.put(6, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		map.put(200, "ok");
		return map;
	}
	
	@DELETE
	@Path("/RemoveCustomer")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, String> removeCustomer(Customer customer){
		Map<Integer, String> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			adminFacade.removeCustomer(customer);
		} catch (CouponSystemException e) {
			map.put(7, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		map.put(200, "ok");
		return map;
	}
	
	@PUT
	@Path("/UpdateCustomer")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Map<Integer, String> updateCustomer(Customer customer){
		Map<Integer, String> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			adminFacade.updateCustomer(customer);
		} catch (CouponSystemException e) {
			map.put(8, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		map.put(200, "ok");
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/customer")
	public Map<Integer, Object> getCustomer(@QueryParam("id") long id){
		Map<Integer, Object> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			map.put(200, adminFacade.getCustomer(id));
		} catch (CouponSystemException e) {
			map.put(9, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/customers")
	public Map<Integer, Object> gatAllCustomer(){
		Map<Integer, Object> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			map.put(200, adminFacade.getAllCustomers());
		} catch (CouponSystemException e) {
			map.put(10, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/customerByName")
	public Map<Integer, Object> getCustomerByName(@QueryParam("name") String name){
		Map<Integer, Object> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			map.put(200, adminFacade.getCustomerByName(name));
		} catch (CouponSystemException e) {
			map.put(11, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/companyName")
	public Map<Integer, Object> getCompanyByName(@QueryParam("name") String name){
		Map<Integer, Object> map = new HashMap<>();
		try{
			AdminFacade adminFacade = (AdminFacade)Utility.getFacade(request);
			map.put(200, adminFacade.getCompanyByName(name));
		} catch (CouponSystemException e) {
			map.put(12, e.getMessage());
		} catch (ExceptionREST e) {
			map.put(e.getErrorNumber(), e.getMessage());
		}
		return map;
	}
	
}