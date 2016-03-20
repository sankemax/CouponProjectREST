package utilities;

import javax.xml.bind.annotation.XmlRootElement;

import org.codehaus.jackson.annotate.JsonProperty;

import core.ClientType;

@XmlRootElement
public class LoginBean {
	
	@JsonProperty("name") private String name;
	@JsonProperty("pass") private String password;
	@JsonProperty("type") private ClientType type;

	public LoginBean() {}
	
	@JsonProperty("name")
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@JsonProperty("pass")
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@JsonProperty("type")
	public ClientType getType() {
		return type;
	}
	public void setType(ClientType type) {
		this.type = type;
	}
	
	
}
