import { ControlPanel } from './components/control-panel/control-panel';
import { Logo } from './components/logo/logo';
import styled from 'styled-components';

const Description = styled.div`
    font-size: 16px;
    color: #666;
    margin-top: 10px;
    margin-left: 10px;
    font-weight: 400;
    `;
const HeaderContainer = ({ className }) => (
    <header className={className}>
        <Logo />
        <Description>
            Web-technology
            <br/>
            Coding
            <br/>
            Error analysis
        </Description>
        <ControlPanel />
    </header>
);
export const Header = styled(HeaderContainer)`
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 1000px;
    height: 120px;
    padding: 20px 40px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background: #fff;
`;
