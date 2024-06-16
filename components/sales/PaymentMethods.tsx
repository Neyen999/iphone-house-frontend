const PaymentMethods = ({ methods }: { methods: any}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Métodos de Pago</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {methods.map((method: any, index: number) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{method.name}</h3>
            <p className="text-sm">Balance: {method.balance}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
