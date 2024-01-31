import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThemeSelect from "./ThemeSelector";
import { useRef, useState } from "react";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { useLogin } from "../contexts/LoginContext";

interface HeadingProps {
    
}

const Heading: React.FC<HeadingProps> = ({}) => {
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const anchorElement = useRef<any>();
    const {isLoggedIn} = useLogin();

    return (
        <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        item
        xs={12}
      >
        {/* Theme and Login Icons */}
        <ThemeSelect />
        <IconButton
          onClick={() => setProfileOpen(!profileOpen)}
          ref={anchorElement}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
          anchorEl={anchorElement.current}
        >
          <MenuItem
            onClick={() => {
              sessionStorage.clear();
              navigate("/");
            }}
          >
            {isLoggedIn ? 'Logout' : 'Go to Login Page'}
          </MenuItem>
          <MenuItem
            onClick={() =>
              alert(
                "click on the edit buttons to open a window that lets you select from avaliable classes. when you're done, click the Save Changes button."
              )
            }
          >
            Help
          </MenuItem>
        </Menu>
      </Grid>
    )
}

export default Heading;