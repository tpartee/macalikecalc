
interface ButtonProps {
    onClick: () => void;
    className: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ( { onClick, className, children } ) => {
    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    );
};

export default Button;