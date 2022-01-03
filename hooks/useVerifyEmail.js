import axios from "axios";
import Notiflix from "notiflix";
import { useState } from "react";

const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const resendEmailVerification = async () => {
    setLoading(true);
    try {
      await axios.post('email/verification-notification');
      Notiflix.Report.success('Verification Sent!', 'Please check your email and click the verification link!', 'OK!', {
        fontFamily: 'system-ui'
      });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }
  return { resendEmailVerification, loading };
}

export default useVerifyEmail;