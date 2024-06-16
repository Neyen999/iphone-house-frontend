const UserActivity = ({ activityType, activityData }: { activityType: string, activityData: Activity[]}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">{activityType === 'sales' ? 'Historial de Ventas' : 'Historial de Reparaciones'}</h2>
      {activityData.length === 0 ? (
        <p className="text-gray-500">No hay actividad reciente</p>
      ) : (
        <ul>
          {activityData.map((activity, index) => (
            <li key={index} className="py-2">
              <div className="flex justify-between items-center border-b pb-2">
                <p>{activity.productOrItem}</p>
                <p className="text-gray-500">{activity.date}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserActivity;