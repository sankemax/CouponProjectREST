package utilities;

import java.util.Date;

import core.ejb.Income;
import core.enums.ClientType;
import core.enums.IncomeType;

public class IncomeUtility {

	public static Income fillIncome(String name, ClientType clientType, IncomeType incomeType, double price) {
		
		Income income = new Income();
		income.setName(name);
		income.setClient(clientType);
		income.setDate(new Date());
		income.setDescription(incomeType);
		income.setAmount(price);
		return income;
	}
}