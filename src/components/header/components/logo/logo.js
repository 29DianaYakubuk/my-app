import {Link} from 'react-router-dom';
import {Icon} from '../../../../components/icon/icon';
import styled from 'styled-components';


const LargeText = styled.div`
    font-size: 48px;
    font-weight: bold;
    color: #333;
`;
const SmallText = styled.div`
    font-size: 16px;
    color: #666;
`;

const LogoContainer = ({ className }) => (
    <Link className={className} to="/">
        <Icon id="fa-code" size="70px" margin="0 10px 0 0"/>
        <div>
            <LargeText>Blog</LargeText>
            <SmallText>Web-developer</SmallText>
        </div>
    </Link>
);
export const Logo = styled(LogoContainer)`
    display: flex;
    margin-top: -21px;
    `;
