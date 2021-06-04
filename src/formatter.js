module.exports.format = (payload, selectedBank, chart) => {
  const formattedPayload = {
    tenure: payload.tenure,
    loanAmount: payload.loadAmount,
    totalDebtOutstanding: payload.totalDebtOutstanding,
    totalIncome: payload.totalIncome,
    propertyPrice: payload.propertyPrice,
    loanInsuranceType: payload.loanInsuranceType,
    totalDeposits: payload.totalDeposits,
    currency: payload.currency,
    downPayment: payload.downPayment,
    banks: payload.banks,
    expenses: getExpesensByBank(payload.banks),
    bankNames: getBanksName(payload.banks),
    selectedBank,
    chart
  };
  return formattedPayload;
};



const getExpesensByBank = (banks) => {
  const bankNames = [];
  const installmentAmounts = [];
  const managementFees = [];
  const estimatedUtilitiesFees = [];
  const repairAndMaintenances = [];
  const montlyExpenses = [];
  const balances = [];

  banks.forEach((e) => {
    bankNames.push(e.bankName);
    installmentAmounts.push(e.monthlyPayment);
    managementFees.push(e.averageUtility.managementFee);
    estimatedUtilitiesFees.push(e.averageUtility.totalUtilities);
    repairAndMaintenances.push(e.averageUtility.repairMaintenanceReserve);

    const totalMonthlyExpenses =
      e.monthlyPayment +
      e.averageUtility.managementFee +
      e.averageUtility.totalUtilities +
      e.averageUtility.repairMaintenanceReserve;
    montlyExpenses.push(totalMonthlyExpenses);

    const balance = e.totalIncome - totalMonthlyExpenses;

    balances.push(balance.toFixed(2));
  });

  const payload = [
    {
      title: 'Estmated installment amount',
      values: installmentAmounts,
    },
    {
      title: 'Est. management fee',
      values: managementFees,
    },
    {
      title: 'Estimated utilities fee',
      values: installmentAmounts,
    },
    {
      title: 'Repair & maintenance reserve',
      values: repairAndMaintenances,
    },
    {
      title: 'Estimated monthly expenses',
      values: montlyExpenses,
    },
    {
      title: 'Balance',
      values: balances,
    },
  ];

  return payload
};

const getBanksName = (banks) => {
  return banks.map(e => e.bankName)
}