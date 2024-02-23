import React from 'react';
import PropTypes from 'prop-types';

function InputWithLabel({id, title, value, handleChange, children, comment}) {
    
    InputWithLabel.propTypes = {
        id: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        handleChange: PropTypes.func.isRequired,
        children: PropTypes.string,
        comment: PropTypes.string
      }

    const inputRef = React.useRef(null);

    React.useEffect(() => {
        inputRef.current.focus()
      });

  return ( 
            <React.Fragment>
                <label htmlFor={id} >{children}</label>
                <input id={id} name={title} value={value} onChange={handleChange} ref ={inputRef} placeholder={comment} ></input>
            </React.Fragment>
        )
  } 

export default InputWithLabel;