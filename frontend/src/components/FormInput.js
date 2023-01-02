import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  function handleInputColMd() {
    if (inputProps.name === 'username' 
        || inputProps.name === 'email'
        || inputProps.name === 'phoneNumber') {
      return('12');
    }
    return('6');
  }

  function handleInvalid() {
    if (inputProps.value === "") {
      return(
        `Please fill in your ${inputProps.placeholder}`
      );
    }
    return(
      errorMessage
    );
  }

  return (
    <Form.Group as={Col} md={handleInputColMd()} className="form-floating">
        <Form.Control
          {...inputProps}
          className="form-control form-control-lg"
          onChange={onChange}
        />
      <Form.Label className="form-label text-black" htmlFor="form3Example1cg">{label}</Form.Label>
      <Form.Control.Feedback type="invalid">
        {handleInvalid()}
      </Form.Control.Feedback>
      </Form.Group>
  );
};

export default FormInput;