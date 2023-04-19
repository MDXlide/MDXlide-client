import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { SessionProvider } from "next-auth/react";
import store from "../app/store";
import "@/styles/globals.css";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(App);
