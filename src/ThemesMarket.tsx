import { useNavigate } from "react-router-dom";
import { useLogin } from "./contexts/LoginContext";
import CreateThemeModal from "./components/market/CreateThemeModal";
import Heading from "./components/Heading";


export const ThemesMarket: React.FC = () => {
    const { isLoggedIn } = useLogin();
    const navigate = useNavigate();

    if(!isLoggedIn) {
        navigate('/');
    }

    return (
        <>
            <Heading />
            <CreateThemeModal/>
        </>
    )
}