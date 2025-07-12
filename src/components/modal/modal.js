import { useSelector } from 'react-redux';
import {Button} from '../button/button';
import {selectModalIsOpen, selectModalOnConfirm, selectModalOnCancel, selectModalText} from '../../selectors'
import styled from 'styled-components';

const ModalContainer = ({className}) => {
    const isOpen = useSelector(selectModalIsOpen);
    const text = useSelector(selectModalText);
    const onConfirm = useSelector(selectModalOnConfirm);
    const onCancel = useSelector(selectModalOnCancel);

    if (!isOpen) {
        return null;
    }

    return <div className={className}>
            <div className="overlay"></div>
            <div className="box">
                <h3>{text}</h3>
                <div className="buttons">
                    <Button width="120px" onClick={onConfirm}>Confirm</Button>
                    <Button width="120px" onClick={onCancel}>Cancel</Button>
                </div>
            </div>
        </div>;
};
 
export const Modal = styled(ModalContainer)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;

    & .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    & .box {
        position: relative;
        width: 400px;
        text-align: center;
        margin: 100px auto;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    & h3 {
        margin-bottom: 20px;
    }

    & .buttons {
        display: flex;
        justify-content: space-between;
    }
      
    & .buttons button {
        margin: 0 5px;
}
`;