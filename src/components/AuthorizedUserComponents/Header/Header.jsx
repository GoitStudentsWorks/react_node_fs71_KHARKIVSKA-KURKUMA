import { Container, HeaderTitleContainer, HeaderTitle } from './Header.styled';
import { AddFeedbackBtn, ThemeToggler, UserInfo } from './HeaderItems';
import { useLocation } from 'react-router-dom';
import BurgerToggleContainer from '../SideBar/SideBarItems/BurgerMenu/BurgerToggleContainer';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/user/selectors';
import { fetchCurrentUser } from 'store/user/operations';
import { useDispatch } from 'react-redux';

const Header = ({
  theme,
  toggleTheme,
  showBurgerMenu,
  handleBurgerToggleClick,
}) => {
  const location = useLocation();
  let pageTitle = 'User Profile';
  if (location.pathname === '/calendar') {
    pageTitle = 'Calendar';
  } else if (location.pathname === '/account') {
    pageTitle = 'User Profile';
  } else if (location.pathname === '/statistics') {
    pageTitle = 'Statistics';
  }
  const dispatch = useDispatch()
  dispatch(fetchCurrentUser());
  const user = useSelector(selectUser)
  const {name, avatarURL} = user
  // const hasAvatar = false;
  return (
    <Container>
      <HeaderTitleContainer>
        <HeaderTitle>{pageTitle}</HeaderTitle>
      </HeaderTitleContainer>
      <BurgerToggleContainer
        showBurgerMenu={showBurgerMenu}
        setShowBurgerMenu={handleBurgerToggleClick}
      />
      <AddFeedbackBtn />
      <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
      <UserInfo userName={name} avatarUrl={avatarURL} />
    </Container>
  );
};

export default Header;
