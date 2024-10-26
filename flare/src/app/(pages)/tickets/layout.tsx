import { Children } from "@/app/lib/types";
import SidebarButton from "@/app/components/ui/SidebarButton";
import {Cog, DollarSign, HomeIcon, MessageSquareMore, Ticket} from "lucide-react";

import "@/app/styles/main.scss";
import UserPanel from "@/app/components/ui/UserPanel";

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
                  <SidebarButton icon={<MessageSquareMore className="icon" />}
                                 text="Feedback" 
                                 route="/feedback"
                                 />
                <SidebarButton
                  icon={<Cog className="icon" />}
                  text="Settings"
                  route="/settings"
                />
              </div>

              <div className="bottom-section">
                <UserPanel />
              </div>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}
