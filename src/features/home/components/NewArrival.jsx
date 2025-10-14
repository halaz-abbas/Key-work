import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function NewArrival() {
  const renderImageBox = (src, alt, text, fontSize) => (
    <Box
      sx={{
        flex: 1,
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#000",
        transition: "transform 0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
        },
        "&:hover .overlay": {
          opacity: 1,
        },
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      {/* Overlay */}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.3)",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          color: "#fff",
          width: "70%",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: fontSize,
            mb: 0.5,
            fontWeight: 500,
            borderBottom: "1.5px solid #fff",
            pb: 0.5,
          }}
        >
          {text}
        </Typography>
        <Button
          variant="text"
          sx={{
            color: "#fff",
            fontSize: fontSize,
            textTransform: "none",
            borderBottom: "1.5px solid #fff",
            px: 0,
            mt: 1,
          }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 6 } }}>
      <Box sx={{ textAlign: "left", mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              backgroundColor: "red",
              borderRadius: "2px",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: "red",
              fontWeight: 500,
              textTransform: "uppercase",
              fontSize: 12,
            }}
          >
            Featured
          </Typography>
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "black",
            lineHeight: 1.2,
          }}
        >
          New Arrival
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "nowrap",
          alignItems: "stretch",
          justifyContent: "space-between",
        }}
      >
        {/* Main Image */}
        {renderImageBox(
          "\\imges\\ps5-slim-goedkope-playstation_large 1.png",
          "PlayStation 5",
          "Black and White version of the PS5 coming out on sale.",
          14
        )}

        {/* Right Column */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {renderImageBox(
            "imges\\attractive-woman-wearing-hat-posing-black-background 1.png",
            "Women's Collection",
            "Featured woman collections that give you another vibe.",
            13
          )}

          <Box sx={{ display: "flex", gap: 3, flex: 1 }}>
            {renderImageBox(
              "/imges/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1@2x.png",
              "Speakers",
              "Amazon wireless speakers.",
              12
            )}
            {renderImageBox(
              "/imges/652e82cd70aa6522dd785109a455904c@2x.png",
              "Perfume",
              "GUCCI INTENSE OUD EDP",
              12
            )}
          </Box>
        </Box>
      </Box>

      {/* Grid Features */}
      <Grid
        container
        spacing={4}
        sx={{
          mt: 8,
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {[
          {
            icon: <LocalShippingIcon sx={{ fontSize: 30 }} />,
            title: "Fast Delivery",
            desc: "Get your items quickly and safely",
          },
          {
            icon: <HeadsetMicIcon sx={{ fontSize: 30 }} />,
            title: "24/7 Support",
            desc: "Always here to help you",
          },
          {
            icon: <VerifiedUserIcon sx={{ fontSize: 30 }} />,
            title: "Secure Shopping",
            desc: "Your data is safe with us",
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box
              sx={{
                backgroundColor: "#ccc",
                borderRadius: "50%",
                width: 80,
                height: 80,
                mx: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 60,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </Box>
            </Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.desc}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
