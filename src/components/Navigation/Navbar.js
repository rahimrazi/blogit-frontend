import React from "react";
import { useSelector } from "react-redux";

import AdminNavbar from "./Admin/AdminNavbar";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "./Alerts/AccountVerificationSuccessAlert";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

const Navbar = () => {
  //get user from store
  const state = useSelector((state) => state?.users);

  const { userAuth,profile } = state;
  

  const isAdmin = userAuth?.isAdmin;

  // getting state( of account verification)
  const account = useSelector(state=>state?.accountVerification)
  
 const {loading,appErr,serverErr,token} = account;
  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin = {userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin = {userAuth}/>
      ) : (
        <PublicNavbar />
      )}
      {/* Display Alert */}
      
      {userAuth && !userAuth?.isVerified && <AccountVerificationAlertWarning/>}
      {/* display success message */}
    {loading && <h2 className="text-center">Loading..Please Wait</h2>}
    {token && <AccountVerificationSuccessAlert/>}
    {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {serverErr} {appErr}
        </h2>
      ) : null}
    </>
    
  );
};

export default Navbar;
