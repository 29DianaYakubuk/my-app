import styled from 'styled-components';
import {Input, Icon} from '../../../../components';


const SearchContainer = ({className, searchPhrase, onChange}) => {
    return (
        <div className={className}>
            <Input  value={searchPhrase} type="text" placeholder="Search posts..." onChange={onChange} />
            <Icon inactive={true} id="fa-search"  size="21px" />
        </div>
    );
};

export const Search = styled(SearchContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;

    & input {
        width: 300px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    & button {
        margin-left: 10px;
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #0056b3;
        }
    }
`;