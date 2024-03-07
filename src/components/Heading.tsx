import { Grid, IconButton, Menu, MenuItem, Switch, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThemeSelect from "./ThemeSelector";
import { useRef, useState } from "react";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import CodeIcon from "@mui/icons-material/Code";
import { useLogin } from "../contexts/LoginContext";
import { useSecretMode } from "../contexts/SecretModeContexts";
import { useJSONTheme } from "../contexts/ThemeContext";
import { createPortal } from "react-dom";
import ThemeModal from "./ThemeEditor/ThemeModal";
import ArticleIcon from '@mui/icons-material/Article';

interface HeadingProps {}

const Heading: React.FC<HeadingProps> = ({}) => {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [devMenuOpen, setDevMenuOpen] = useState<boolean>(false);
  const [themeEditorOpen, setThemeEditorOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { getThemeObject } = useJSONTheme();

  const themeObject = getThemeObject();

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
        fliter: 'drop-shadow(0px 10px 10px #000000ff);',
        backdropFilter: 'blur(20px)',
        boxShadow: themeObject.header_drop_shadow_color,
        backgroundColor: themeObject.header_background_color
      }}
      item
      xs={12}
    >
      {/* Theme and Login Icons */}
      <ThemeSelect key={0}/>
      <IconButton
        onClick={() => setProfileOpen(!profileOpen)}
        ref={profileAnchorElement}
        key={1}
      >
        <AccountCircleIcon />
      </IconButton>
      <IconButton
        onClick={() => navigate('/patch_notes')}
        key={2}
      >
        <ArticleIcon />
      </IconButton>
      <Menu
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        anchorEl={profileAnchorElement.current}
        key={3}
      >
        <MenuItem
          onClick={() => {
            sessionStorage.clear();
            localStorage.setItem('username', '');
            localStorage.setItem('password', '')
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
            key={4}
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
              key={5}
            >
              <Typography key={0}>Show Hidden Themes</Typography>
              <Switch
                checked={secretmode.showHiddenThemes}
                inputProps={{ 'aria-label': 'controlled' }}
                key={1}
              />
            </MenuItem>
            <MenuItem
              key={7}
              onClick={() => {
                setDevMenuOpen(false)
                setThemeEditorOpen(true)
              }}
            >
              Theme Editor
            </MenuItem>
            <MenuItem
              key={8}
              onClick={() =>
                alert(
                  "Click on the various beta options to enable them! These options are not easy to get on purpose, so expect bugs. Here be dragons!"
                )
              }
            >
              Help
            </MenuItem>
          </Menu>
        </>
      )}
      {themeEditorOpen && createPortal(<ThemeModal onClose={() => setThemeEditorOpen(false)}/>, document.body)}
    </Grid>
  );
};

export default Heading;
