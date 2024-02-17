import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  Locale,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Educert",
  projectId: "2afb2469942b2b96b36433a184c88bb5",
  chains: [
    avalanche,
    avalancheFuji,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [avalancheFuji]
      : []),
  ],
  ssr: true,
});

const queryClient = new QueryClient();

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor:
      "conic-gradient(from 180deg at 50% 50%, #C729B9 -28.32deg, #B52BBA 4.67deg, #A12CBC 23.65deg, #8C2EBE 44.86deg, #792FBF 72.46deg, #6C30C0 82.5deg, #4B32C3 127.99deg, #5831C2 160.97deg, #6330C1 178.46deg, #742FC0 189.48deg, #8D2DBE 202.95deg, #A62CBC 230.66deg, #B92ABA 251.35deg, #D029B8 276.44deg, #EC27B6 306.45deg, #C729B9 331.68deg, #B52BBA 364.67deg);",
    connectButtonBackground:
      "conic-gradient(from 180deg at 50% 50%, #C729B9 -28.32deg, #B52BBA 4.67deg, #A12CBC 23.65deg, #8C2EBE 44.86deg, #792FBF 72.46deg, #6C30C0 82.5deg, #4B32C3 127.99deg, #5831C2 160.97deg, #6330C1 178.46deg, #742FC0 189.48deg, #8D2DBE 202.95deg, #A62CBC 230.66deg, #B92ABA 251.35deg, #D029B8 276.44deg, #EC27B6 306.45deg, #C729B9 331.68deg, #B52BBA 364.67deg);",
    modalBackground:
      "linear-gradient(180deg, #B21888 0%, #4C32C3 100%),linear-gradient(0deg, #C4C4C4, #C4C4C4)",
  },
  shadows: {
    connectButton: "0px 0px 60px 0px #EC27B699",
  },
});

function App({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          locale={Locale}
          coolMode={true}
          modalSize="compact"
          theme={myTheme}
        >
          <ChakraProvider>
            <div className="bg-[#0B031E]">
              <Component {...pageProps} />
            </div>
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
