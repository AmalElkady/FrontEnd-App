import React from "react";
import List from "@material-ui/core/List/index";
import productData from "../../../app/eCommerce/productData";
import ProductListItem from "../../../components/eCommerce/ProductListItem";

function ProductsList() {
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <List>
        {productData.map((product, index) => (
          <ProductListItem key={index} product={product} />
        ))}
      </List>
    </div>
  );
}

export default ProductsList;
