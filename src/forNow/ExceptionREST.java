package forNow;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ExceptionREST extends Exception{
	
	private static final long serialVersionUID = 1L;
	

	public static final String NO_CONNECTION = "Expired connection";
	
	public ExceptionREST (String massage, int errorNumber) {
		super(massage);
		setErrorNumber(errorNumber);
	}
	
	private int errorNumber;
	
	public int getErrorNumber() {
		return errorNumber;
	}

	public void setErrorNumber(int errorNumber) {
		this.errorNumber = errorNumber;
	}


}
