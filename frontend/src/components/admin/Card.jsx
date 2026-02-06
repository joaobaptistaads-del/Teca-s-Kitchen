const Card = ({ title, value, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {Icon && (
          <div className={`${colorClasses[color]} p-4 rounded-full`}>
            <Icon className="text-white" size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
