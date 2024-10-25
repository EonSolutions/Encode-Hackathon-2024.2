import { Children } from "@/lib/types";
import SidebarButton from "@/components/ui/SidebarButton";
import {
  ArrowUp,
  ArrowUpDown,
  Book,
  Cog,
  DollarSign,
  HomeIcon,
  LineChart,
  Sprout,
  Ticket,
} from "lucide-react";

import "@/styles/main.scss";
import Image from "next/image";
import ConnectWalletButton from "@/components/ui/ConnectWalletButton";

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
                  icon={<Ticket className="icon" />}
                  text="Tickets"
                  route="/tickets"
                />
                <SidebarButton
                  icon={<DollarSign className="icon" />}
                  text="Resell"
                  route="/resell"
                />
                <SidebarButton
                  icon={<Cog className="icon" />}
                  text="Settings"
                  route="/settings"
                />
              </div>

              <div className="bottom-section">
                <ConnectWalletButton />
                <div className="external-links">
                  <div className="nav-item">
                    <div className="profile-container">
                      <Image
                        className="avatar"
                        src="/avatar.png"
                        width={32}
                        height={32}
                        alt="avatar"
                      />
                      <div className="profile-info">
                        <p className="profile-name">Bitwallet</p>
                        <p className="profile-email">0xad8908098a0d8098a</p>
                      </div>
                    </div>
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
