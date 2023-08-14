import Header from "../../components/Global/Header/Header";
import { useAuthContext } from "../../contexts/AuthContainer";

// AppHeader = header (design) with app logic
const AppHeader = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return <Header onLogout={handleLogout} />;
};

export default AppHeader;
