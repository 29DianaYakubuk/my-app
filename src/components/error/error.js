
import { H2 } from '../h2/h2';
import styled from 'styled-components';
import { PROP_TYPE } from '../../constants/prop-type';

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
`;

export const Error = ({ error }) =>
    error && (
        <Div>
            <H2>Error</H2>
            <div>{error}</div>
        </Div>
    );

    Error.propTypes = {
        error: PROP_TYPE.ERROR,
    };