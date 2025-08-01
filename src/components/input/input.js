import PropTypes from 'prop-types';
import styled from 'styled-components';
import { forwardRef } from 'react';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
    return <input className={className} {...props} ref={ref} />;
});
export const Input = styled(InputContainer)`
    height: 40px;
    margin: 0 0 10px;
    padding: 10px;
    border: 1px solid #ccc;
    font-size: 16px;
    width: ${({ width = '100%' }) => width};
    border-radius: 5px;
    box-sizing: border-box;
`;
Input.propTypes = {
    width: PropTypes.string
};