"use client"
import '../styles/globals.css';
import { MoralisProvider } from 'react-moralis';
import { NotificationProvider } from '@web3uikit/core';

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body>
        <MoralisProvider initializeOnMount={false} >
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </MoralisProvider>
      </body>
    </html>
  );
}
