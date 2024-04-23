"use client"

import { appStore } from "@/redux/store/appStore";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css';
import './animation.css'
import './mediaQueries.css'
import { Provider } from "react-redux";
import { RootLayoutWrapper } from "./layoutWrapper";
const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appStore}>
          <RootLayoutWrapper>
            {children}
          </RootLayoutWrapper>
        </Provider>

      </body>
    </html>
  );
}

export default RootLayout;