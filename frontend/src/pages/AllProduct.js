import React, { useEffect, useState } from "react";
import AdminProductCard from "../components/AdminProductCard";
import UploadProduct from "../components/UploadProduct";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchAllProductsOfAdmin } from "../hooks/useFetchAllProductsOfAdmin";
import Loader from "../components/Loader";

const AllProduct = () => {
  const [showProductUpload, setShowProductUpload] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const adminAllUploadedProducts = useFetchAllProductsOfAdmin();

  const handleFetchAllProductData = async () => {
    setLoading(true);
    const jsonData = await adminAllUploadedProducts();
    if (jsonData.success) {
      setAllProduct(jsonData.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetchAllProductData();
  }, []);

  if (!user) {
    navigate("/");
  }

  return loading ? (<Loader/>) : (
    <div>
      <div className="bg-white py-2 md:px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="md:border-2 border md:px-2 md:text-base text-sm  md:py-1 border-primary md:rounded-full rounded text-primary hover:bg-primary hover:text-white transition-all"
          onClick={() => setShowProductUpload(true)}
        >
          Add New Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct &&
          allProduct.map((product, index) => {
            return (
              <AdminProductCard
                data={product}
                key={index + "allProduct"}
                fetchData={handleFetchAllProductData}
              />
            );
          })}
      </div>

      {showProductUpload && (
        <UploadProduct
          onClose={() => setShowProductUpload(false)}
          fetchData={handleFetchAllProductData}
        />
      )}
    </div>
  );
};

export default AllProduct;
