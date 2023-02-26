import { FormInputLabel, Input, Group  } from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <input className='form-input' {...otherProps} />
      {label && (
        <label
          shrink={otherProps.value.length}
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </Group>
  );
};

export default FormInput;
