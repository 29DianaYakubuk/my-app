import styled from 'styled-components';

const ButtonContainer = ({children, className, width, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export const Button = styled(ButtonContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px
    height: 32px;
    width: ${({ width = '100%' }) => width};
    border: 1px solid rgb(0, 0, 0);
    background-color: rgb(238, 238, 238);
    &:hover {
        cursor: ${({disabled}) => (disabled? 'default' : 'pointer')};
    }
    `;