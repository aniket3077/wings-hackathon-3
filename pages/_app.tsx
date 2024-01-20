// pages/_app.js
import { RecoilRoot } from "recoil";
import layout from "@/app/layout";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <layout>
        <Component {...pageProps} />
      </layout>
    </RecoilRoot>
  );
}

export default MyApp;
