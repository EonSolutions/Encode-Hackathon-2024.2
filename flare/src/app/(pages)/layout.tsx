import { Children } from "@/lib/types";
import SidebarButton from "@/components/ui/SidebarButton";
import {
  ArrowUp,
  ArrowUpDown,
  Book,
  HomeIcon,
  LineChart,
  Sprout,
} from "lucide-react";

import "@/styles/main.scss";

export default function MainLayout({ children }: Children) {
  return (
    <div className="app">
      <div className="layout-container">
        <div className="main-content">
          <div className="sidebar">
            <div className="sidebar-content">
              <div className="nav-links">
              <SidebarButton
                  icon={<HomeIcon className="icon" />}
                  text="Home"
                  route="/"
                />
                <SidebarButton
                  icon={<LineChart className="icon" />}
                  text="Trade"
                  route="/trade"
                />
                <SidebarButton
                  icon={<ArrowUpDown className="icon" />}
                  text="Lend"
                  route="/lend"
                />
                <SidebarButton
                  icon={<ArrowUp className="icon" />}
                  text="Borrow"
                  route="/borrow"
                />
                <SidebarButton
                  icon={<Sprout className="icon" />}
                  text="Farm"
                  route="/farm"
                />
              </div>

              <div className="bottom-section">
                <button className="connect-wallet">Connect Wallet</button>
                <div className="external-links">
                  <div className="nav-item">
                    <Book className="icon" />
                    <p>Docs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}
