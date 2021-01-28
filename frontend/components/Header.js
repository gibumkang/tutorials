import styled from '@emotion/styled';
import Link from 'next/link';

const Header = () => {
    return (
        <HeaderStyled>
            <Link href="/"><a>Go Home</a></Link>
        </HeaderStyled>
    )
}

const HeaderStyled = styled.header`
    background: ${props => props.theme.colors.primary};
`

export default Header;