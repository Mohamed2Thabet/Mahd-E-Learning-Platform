const Card = ({ title, children, className = "", icon: Icon }) => (
  <div className={`card p-6 ${className}`}>
    {title && (
      <div className="flex items-center mb-4">
        {Icon && <Icon className="w-5 h-5 mr-2 text-primary" />}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    )}
    {children}
  </div>
);

export default Card;
