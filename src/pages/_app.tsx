import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DarkModeProvider } from '../context/DarkModeContext'; // Import DarkModeProvider

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DarkModeProvider> {/* Wrap the whole app with the provider */}
      <Component {...pageProps} />
    </DarkModeProvider>
  );
}

export default MyApp;