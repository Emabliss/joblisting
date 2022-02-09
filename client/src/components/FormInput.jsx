const FormInput = ({ id, title, type, onChange, value }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-darkblue text-sm tracking-wider font-semibold"
      >
        {title}
      </label>
      <br />
      <input
        type={type}
        className="formInput"
        id={id}
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
};

export default FormInput;
