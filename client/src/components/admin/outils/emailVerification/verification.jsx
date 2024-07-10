import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../../../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react";
const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [error, setError] = useState(null);
  const param = useParams();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${appUrl}/users/${param.id}/verify/${param.token}`;
        const response = await axios.get(url);
        console.log(response.data);
        setValidUrl(true);
      } catch (error) {
        console.error(error);
        setError(error.message || 'An error occurred while verifying the email.');
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1 style={{textAlign: 'center',fontFamily: 'Constantia',fontWeight:"bold"}}>Email verified successfully</h1>
          <Link to="/signin">
            <button className={styles.green_btn} style={{fontFamily: 'Constantia',fontWeight:"bold"}}>Login</button>
          </Link>
        </div>
      ) : (
        <h1>{error ? error : '404 Not Found'}</h1>
      )}
    </Fragment>
  );
};

export default EmailVerify;
