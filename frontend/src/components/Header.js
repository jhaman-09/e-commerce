import React from "react";
import Logo from "./Logo";
import { IoSearch } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { endPoint } from "../helper/api";
import { toast } from "react-toastify";
import { isAutherized, removeUser } from "../store/userSlice";

const Header = () => {
  const { autherized } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(endPoint.logout.url, {
        method: endPoint.logout.method,
        credentials: "include",
      });

      const data = await response.json();
      if (data.error) {
        toast(data.message);
        throw new Error(data.message);
      } else {
        toast(data.message);
        dispatch(removeUser());
        dispatch(isAutherized(false));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="container mx-auto h-full flex items-center px-5 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex pl-2 items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search Your Product Here.."
            className="w-full outline-none "
          />
          <div className="text-lg text-white bg-[#9F2B68] min-w-[50px] h-8 flex items-center justify-center rounded-r-full">
            <IoSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">{<FaCircleUser />}</div>
          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
              <div className="bg-[#9F2B68] text-white w-4 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">0</p>
              </div>
            </span>
          </div>

          <div>
            {!autherized ? (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-[#9F2B68] hover:bg-[#c20d6d]"
              >
                login
              </Link>
            ) : (
              <Link
                className="px-3 py-1 rounded-full text-white bg-[#9F2B68] hover:bg-[#c20d6d]"
                onClick={handleLogout}
              >
                logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
