import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableRowContainer = ({ className, children }) => (
    <div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
    display: flex;
    alight-items: center;
    border: ${({ border }) => (border ? '1px solid #000;' : 'none')};

    & > div {
        display: flex;
        padding: 0 10px;

        text-align: center;
    }

    & .login-column {
        text-align: left;
        width: 172px;
    }

    & .registerd-at-column {
        width: 213px;
    }

    & .role-column {
        width: auto;
    }
`;

TableRow.propTypes = {
    children: PropTypes.node.isRequired,
};