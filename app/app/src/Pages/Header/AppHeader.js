import Header from "../../components/Global/Header/Header";
import { useAuthContext } from "../../contexts/AuthContainer";

// AppHeader = header (design) with app logic
const AppHeader = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    localStorage.clear();
  };

  return <Header onLogout={handleLogout} />;
};

export default AppHeader;
