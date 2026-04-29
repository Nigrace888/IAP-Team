const InputField = (
  ({ label, type, value, onChange, placeholder,ref }) => {
  return (
    <div className="space-y-2">
      <p className="font-bold capitalize">{label}</p>
      <input
        ref={ref}
        className="h-8 text-sm w-full border-2 border-zinc-500 rounded-md px-2"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
    );
  }
);

export default InputField;