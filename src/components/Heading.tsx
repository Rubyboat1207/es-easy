import { Grid, IconButton, Menu, MenuItem, Switch, ToggleButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThemeSelect from "./ThemeSelector";
import { useRef, useState } from "react";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import CodeIcon from "@mui/icons-material/Code";
import { useLogin } from "../contexts/LoginContext";
import { useSecretMode } from "../contexts/SecretModeContexts";

interface HeadingProps {}

const Heading: React.FC<HeadingProps> = ({}) => {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [devMenuOpen, setDevMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const profileAnchorElement = useRef<any>();
  const devAnchorElement = useRef<any>();
  const { isLoggedIn } = useLogin();
  
  const secretmode = useSecretMode();

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
        ref={profileAnchorElement}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        anchorEl={profileAnchorElement.current}
      >
        <MenuItem
          onClick={() => {
            sessionStorage.clear();
            navigate("/");
          }}
        >
          {isLoggedIn ? "Logout" : "Go to Login Page"}
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
      {localStorage.getItem("winner") === "yes" && (
        <>
          <IconButton
            onClick={() => setDevMenuOpen(!devMenuOpen)}
            ref={devAnchorElement}
          >
            <CodeIcon />
          </IconButton>
          <Menu
            open={devMenuOpen}
            onClose={() => setDevMenuOpen(false)}
            anchorEl={devAnchorElement.current}
          >
            <MenuItem
              onChange={() => secretmode.setShowHiddenThemes(!secretmode.showHiddenThemes)}
            >
              <Typography>Show Hidden Themes</Typography>
              <Switch
                checked={secretmode.showHiddenThemes}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </MenuItem>
            <MenuItem
              onChange={() => secretmode.setShowFlexModBeta(!secretmode.showFlexModBeta)}
            >
              <Typography>Enable Flex Mod Beta</Typography>
              <Switch
                checked={secretmode.showFlexModBeta}
                inputProps={{ 'aria-label': 'controlled' }}
              />
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
        </>
      )}
    </Grid>
  );
};

export default Heading;
