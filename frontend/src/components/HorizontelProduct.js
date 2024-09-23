import React, { useEffect, useRef, useState } from "react";
import HorizontalProductCardLoading from "./HorizontalProductCardLoading";
import HorizontalProductCard from "./HorizontalProductCard";
import fetchProductsByCategory from "../hooks/fetchProductsByCategory";

const HorizontelProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingCardArray = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const fetchCategoryByProduct = async () => {
    setLoading(true);
    const categoryProduct = await fetchProductsByCategory(category);
    setLoading(false);
    setData(categoryProduct.data);
  };

  useEffect(() => {
    fetchCategoryByProduct();
  }, []);

  return (
    <div className="container px-4 mx-auto relative my-6 scrollBar-none">
      <h1 className="text-2xl font-semibold py-4">{heading}</h1>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {loading
          ? loadingCardArray.map((product) => (
              <HorizontalProductCardLoading design={"flex"} />
            ))
          : data.map((product) => (
              <HorizontalProductCard
                product={product}
                key={product?.productName}
                design={"flex"}
              />
            ))}
      </div>
    </div>
  );
};

export default HorizontelProduct;
