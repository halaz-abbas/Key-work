import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

const IconCard = ({ icon: Icon, title, description, bgColor = "#ccc" }) => {
  return (
    <Grid xs={12} sm={4}>
      <Box
        sx={{
          backgroundColor: bgColor,
          borderRadius: "50%",
          width: 80,
          height: 80,
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.1)" },
        }}
      >
        <Box
          sx={{
            border: "2px solid #ffffff",
            borderRadius: "50%",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon sx={{ fontSize: 30, color: "#ffffff" }} />
        </Box>
      </Box>

      <Typography variant="subtitle1" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Grid>
  );
};

const FeaturesSection = () => {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        mt: 8,
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <IconCard
        icon={LocalShippingOutlinedIcon}
        title="Fast Delivery"
        description="Get your items quickly and safely"
        bgColor="#0a0a0aff"
      />
      <IconCard
        icon={HeadsetMicOutlinedIcon}
        title="24/7 Support"
        description="Always here to help you"
        bgColor="#0a0a0aff"
      />
      <IconCard
        icon={VerifiedUserOutlinedIcon}
        title="Secure Shopping"
        description="Your data is safe with us"
        bgColor="#0a0a0aff"
      />
    </Grid>
  );
};

export default FeaturesSection;
