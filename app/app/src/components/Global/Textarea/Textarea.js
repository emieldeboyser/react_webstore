import "./Textarea.css";

const Textarea = ({ type, name, value, onChange, disabled = false }) => {
  return (
    <textarea
      className="textarea"
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Textarea;
