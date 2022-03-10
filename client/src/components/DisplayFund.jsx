import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CrowdFund from "../contracts/CrowdFund.json";
import { ethers } from "ethers";

export const DisplayFund = ({ fund, setInteractingToBlockChain }) => {
  const {
    address,
    collectedAmount,
    description,
    image,
    minimumDonation,
    noOfContributors,
    targetFund,
  } = fund;

  const [donation, setDonation] = React.useState(0);
  const fundAbi = CrowdFund.abi;

  const handleDonateFund = async () => {
    if (donation <= 0 || donation < minimumDonation) {
      alert("Please send atleast minimum amount as a donation");
    } else {
      setInteractingToBlockChain(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();

      const fundInstance = new ethers.Contract(
        address,
        fundAbi,
        provider.getSigner(),
      );

      const payload = {
        from: walletAddress,
        value: `${donation}`,
      };

      const tx = await fundInstance.sendDonation(payload);
      await tx.wait().then(() => {
        setInteractingToBlockChain(false);
        window.location.reload();
      });
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "100%",
        cursor: "pointer",
        background: "#e4d6d6",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "#ff9900", padding: "2px 2px" }}>
            {noOfContributors}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={<h2>{description}</h2>}
        subheader={<h4>{`Target ${targetFund / 10 ** 18} Eth`}</h4>}
      />

      <IconButton>
        <CardMedia
          component="img"
          height="400"
          image={image}
          alt="Token Image"
        />
      </IconButton>
      <CardContent>
        <Typography variant="body2" sx={{ color: "black", fontSize: "15px" }}>
          {`Collected ${collectedAmount} Wei`}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          maxWidth: "75%",
        }}
      >
        <IconButton>
          <span>{`Donate Minumum ${minimumDonation} Wei`}</span>
        </IconButton>
      </CardActions>
      <Accordion sx={{ background: "#AADDDE" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Please Donate</h3>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label={`Amount should be greater than ${minimumDonation} Wei`}
            variant="outlined"
            fullWidth
            type="number"
            // value={donation}
            onChange={(e) => setDonation(+e.target.value)}
          />
          <br />
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            color="secondary"
            onClick={handleDonateFund}
            disabled={donation <= 0}
          >
            Donate
          </Button>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};
