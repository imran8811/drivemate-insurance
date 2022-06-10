import { FC, ReactNode } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

export type AppLayoutProps = {
  children : ReactNode
}

const BaseLayout: FC<AppLayoutProps> = ({children}) => {
  return (
    <div className="container-fluid p-0">
      <AppHeader></AppHeader>
      <div className="bg-gray w-100 d-inline-block">{children}</div>
      <AppFooter></AppFooter>
    </div>
  )
}

export default BaseLayout;