import { CustomMessageProvider } from '../src/components/ErrorPopup/context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <CustomMessageProvider>
      <Component {...pageProps} />
    </CustomMessageProvider>
  );
}

export default MyApp
