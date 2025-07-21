import styled from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({className, page, lastPage, setPage}) => {
    return (
        <div className={className}>
            <Button disabled={page === 1} onClick={() => setPage(1)}>
                To the beginning
            </Button>
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                To the previous
            </Button>
            <div className="current-page">Page:{page}</div>
            <Button
                disabled={page === lastPage}
                onClick={() => setPage(page + 1)}
            >
                To the next
            </Button>
            <Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
                To the end
            </Button>
        </div>
    );
};

export const Pagination = styled(PaginationContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 20px;
    padding:0 35px;

    & button {
        margin: 0 5px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }

    & .current-page {
        border: 1px solid #ccc;
        width: 100%;
        height: 32px;
        margin: 0px 10px;
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        line-height: 26px;
    }
`;