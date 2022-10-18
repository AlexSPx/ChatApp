import React, { PropsWithChildren } from "react";
import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import "./PageShell.css";

export { PageShell };

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Layout>
          {children}
        </Layout>
      </PageContextProvider>
    </React.StrictMode>
  );
}

const Layout: React.FunctionComponent<PropsWithChildren> = ({children}) => {
  return (
    <div className="flex w-screen h-screen">
      {children}
    </div>
  )
}