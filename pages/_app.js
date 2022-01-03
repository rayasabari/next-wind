import 'tailwindcss/tailwind.css';
import {RecoilRoot} from 'recoil';
import axios from 'axios';
axios.defaults.baseURL = 'http://api.rysb.test';
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp;
