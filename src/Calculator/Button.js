import "./Button.css";

const Button = ({ className, value, onClick }) => {
  return (
    <button className="calciButton" onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;