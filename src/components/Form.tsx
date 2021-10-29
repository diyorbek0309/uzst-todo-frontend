import classes from "./Form.module.css";

type FormProps = {
  handleInput: any;
  handleSubmit: any;
  value: string;
};

const Form = ({ value, handleInput, handleSubmit }: FormProps) => {
  return (
    <form onSubmit={handleSubmit} action="">
      <input
        type="text"
        name="text"
        placeholder="ToDo Name"
        value={value}
        onChange={(e) => handleInput(e)}
        className={classes.input}
      />
      <button type="submit" className={classes.button}>
        Add
      </button>
    </form>
  );
};

export default Form;
