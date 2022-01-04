import axios from "axios";
import Notiflix from "notiflix";
import { useState } from "react";

const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const resendEmailVerification = async () => {
    setLoading(true);
    Notiflix.Loading.standard('Please wait...');
    try {
      const {data} = await axios.post('email/verification-notification');
      Notiflix.Report.success(
        'Verification Sent',
        `${data.message}. Please check your inbox!`,
        'Okay',
        () => router.replace('/login'),
        {
          fontFamily: 'system-ui',
          borderRadius: '0.75rem',
        },
      )
      setLoading(false);
      Notiflix.Loading.remove();
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      Notiflix.Loading.remove();
    }
  }
  return { resendEmailVerification, loading };
}

export default useVerifyEmail;