import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function NavigationBar() {

  const { t, i18n } = useTranslation();

  // const changeWebsiteLanguageRU = () => {
  //   i18n.changeLanguage('ru');
  // }

  // const changeWebsiteLanguageEN = () => {
  //   i18n.changeLanguage('en');
  // }

  // const changeWebsiteLanguageEE = () => {
  //   i18n.changeLanguage('ee');
  // }

  const changeWebsiteLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }

  return ( 
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/admin">{t('navbar.admin-button')}</Nav.Link>
          <Nav.Link as={Link} to="/meist">{t('navbar.about-button')}</Nav.Link>
          <Nav.Link as={Link} to="/poed">{t('navbar.shops-button')}</Nav.Link>
          <Nav.Link as={Link} to="/ostukorv">{t('navbar.cart-button')}</Nav.Link>
        </Nav>
      </Container>
      <img className='lang' onClick={() => changeWebsiteLanguage('en')} src={require('../assets/english.png')} alt="" />
      <img className='lang' onClick={() => changeWebsiteLanguage('ee')} src={require('../assets/estonian.png')} alt="" />
      <img className='lang' onClick={() => changeWebsiteLanguage('ru')} src={require('../assets/russian.png')} alt="" />
    </Navbar>
   );
}

export default NavigationBar;