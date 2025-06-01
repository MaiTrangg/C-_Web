import './Card.css';

const Card = ({ children, className, title, actions, noPadding, cardStyle }) => {
    return (
        <div className={`custom-card ${className || ''}`} style={cardStyle}>
            {(title || actions) && (
                <div className="custom-card-header">
                    {title && <h3 className="custom-card-title">{title}</h3>}
                    {actions && <div className="custom-card-actions">{actions}</div>}
                </div>
            )}
            <div className={`custom-card-body ${noPadding ? 'custom-card-body--no-padding' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default Card;