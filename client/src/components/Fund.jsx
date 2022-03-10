import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { BaseUrlImgur } from "../helper/networks";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Fund = ({ createNewFund }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [description, setDescription] = useState("");
  const [targetFund, setTargetFund] = useState("");
  const [minimumDonation, setMinimumDonation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState("");

  const ImageRef = useRef(null);

  const handleImageUpload = () => {
    setIsUploading(true);
    const image = ImageRef.current.files[0];
    const data = new FormData();
    data.append("image", image);
    axios
      .post(BaseUrlImgur, data, {
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
        },
      })
      .then((res) => setImage(res.data.data.link))
      .finally(() => setIsUploading(false));
  };

  const handleCreateNewFund = () => {
    if (
      description !== "" &&
      targetFund !== "" &&
      minimumDonation !== "" &&
      deadline !== "" &&
      image !== ""
    ) {
      createNewFund({
        description,
        targetFund,
        minimumDonation,
        deadline,
        image,
      });

      setDescription("");
      setTargetFund("");
      setMinimumDonation("");
      setDeadline("");
      setImage("");
    } else {
      setOpenModal(true);
    }
  };

  console.log(description, targetFund, minimumDonation, deadline, image);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <br />
      <TextField
        label="Description"
        variant="outlined"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <TextField
        label="Target Fund in Ether"
        variant="outlined"
        type="number"
        onChange={(e) => setTargetFund(e.target.value)}
        value={targetFund}
      />
      <TextField
        label="Minimum Donation in Wei"
        variant="outlined"
        type="number"
        onChange={(e) => setMinimumDonation(e.target.value)}
        value={minimumDonation}
      />
      <TextField
        label="Within # days"
        variant="outlined"
        type="number"
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
      />
      <Button variant="contained" component="label" size="big">
        {isUploading ? "Uploading..." : "Upload Image"}
        <input type="file" hidden ref={ImageRef} onChange={handleImageUpload} />
      </Button>
      <br />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCreateNewFund}
        disabled={isUploading}
      >
        <h7 style={{ fontSize: "20px" }}>Raise Fund</h7>
      </Button>
      {/* *********************Moadal Starts********** */}
      <Modal open={openModal}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            style={{ color: "red" }}
          >
            Attention...
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontSize: "20px" }}
          >
            Each field is required to raise a fund
          </Typography>
          <br />
          <Button onClick={() => setOpenModal(false)} variant="contained">
            close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
