import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Button from "@mui/material/Button";

export const NavBar = ({
  walletAddress,
  isLoading,
  handleDisconnectToWallet,
  handleConnectToWallet,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            // border: "2px solid red",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ fontSize: "30px", color: "#e783f7" }}
          >
            𝓗𝓮𝓵𝓹𝓲𝓯𝔂𝓜𝓮
          </Typography>

          <Typography
            variant="h4"
            component="div"
            sx={{ fontSize: "20px", color: "#cff3f0" }}
          >
            {isLoading ? <div>...Loading</div> : walletAddress}
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  walletAddress === ""
                    ? handleConnectToWallet()
                    : handleDisconnectToWallet()
                }
              >
                {walletAddress !== "" ? "LogOut" : "Login"}
              </Button>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
