import React, { useEffect, useState } from "react";
import Product from "../../home/components/Product";
import { Box, Typography, Grid } from "@mui/material";

function RelatedItem() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box my={6}>
      <Box display="flex" alignItems="center" mb={2}>
        <Box width={10} height={20} bgcolor="red" borderRadius={0} mr={1} />
        <Typography variant="h5" fontWeight="bold">
          Related Items
        </Typography>
      </Box>

      <Grid container spacing={2} direction="row">
        {(products.length > 0 ? products.slice(0, 4) : [1, 2, 3, 4]).map(
          (item, idx) => (
            <Grid item key={item.id || idx} xs={12} sm={6} md={3}>
              <Product
                title={item.title}
                image={item.images?.[0] || "/placeholder.png"}
                price={item.price}
              />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}

export default RelatedItem;
