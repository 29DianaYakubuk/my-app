import styled from 'styled-components';
const IconContainer = ({ className, id }) => (
    <div className={className}>
        <i className={`fa ${id}`} aria-hidden="true"></i>
    </div>
);

export const Icon = styled(IconContainer)`
    font-size: ${props => props.size };
    color: ${props => props.color };
    margin-right: ${props => props.marginRight};

`;