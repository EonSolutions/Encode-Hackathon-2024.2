import { Children } from "@/lib/types";

import "@/styles/main.scss";
export default function MainLayout({ children }: Children) {
  return (
    <div className="app">
        <div className="dashboard-container">
          <div className="dashboard-main-content">{children}</div>
        </div>
    </div>
  );
}
