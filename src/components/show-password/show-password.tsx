type PropsType = {
  toggleShowPassword: () => void;
};
const ShowPassword = ({ toggleShowPassword }: PropsType) => {
  return (
    <button
      type="button"
      className="absolute left-2 top-1/2 -translate-y-1/2"
      onClick={toggleShowPassword}
    >
      <img className="h-5 w-5" src={`/icons/eye.png`} alt="password level" />
    </button>
  );
};

export default ShowPassword;
