import { ArrowRight, ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="header">
        <h1>DeTickets</h1>
      </div>

      <div className="tabs">
        <div className="tabs-inner">
          <a href="#" className="tab active">
            <p>Train</p>
          </a>
          <a href="#" className="tab">
            <p>Plane</p>
          </a>
        </div>
      </div>

      <div className="input-container">
        <input type="text" placeholder="Travelling From..." />
        <input type="text" placeholder="Travelling To..." />
        <button>Search</button>
      </div>

      <h2>Search Results</h2>
      <div className="container">
        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="train-container">
                    <div className="train-container-inner">
                      <div className="station-container">
                        <div className="station-time">12:30</div>
                        <div className="station-name">
                          <p className="station-name-inner">London</p>
                          <p className="station-plat-inner">Plat. 7</p>
                        </div>
                      </div>
                      <ArrowRight size={32} />
                      <div className="station-container">
                        <div className="station-time">15:42</div>
                        <div className="station-name">
                          <p className="station-name-inner">Manchester</p>
                          <p className="station-plat-inner">Plat. 3</p>
                        </div>
                      </div>
                    </div>
                    <p className="train-details">
                      LNER Service • 3h 12m • Second Class
                    </p>
                  </div>
                </td>
                <td>
                  <div className="train-price">
                    <p>£12.50</p>
                    <button>
                      <ShoppingCart size={20} />
                      <p style={{ color: "transparent"}}>A</p>
                      Buy Ticket
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="train-container">
                    <div className="train-container-inner">
                      <div className="station-container">
                        <div className="station-time">12:30</div>
                        <div className="station-name">
                          <p className="station-name-inner">London</p>
                          <p className="station-plat-inner">Plat. 7</p>
                        </div>
                      </div>
                      <ArrowRight size={32} />
                      <div className="station-container">
                        <div className="station-time">15:42</div>
                        <div className="station-name">
                          <p className="station-name-inner">Manchester</p>
                          <p className="station-plat-inner">Plat. 3</p>
                        </div>
                      </div>
                    </div>
                    <p className="train-details">
                      LNER Service • 3h 12m • Second Class
                    </p>
                  </div>
                </td>
                <td>
                  <div className="train-price">
                    <p>£12.50</p>
                    <button>
                      <ShoppingCart size={20} />
                      <p style={{ color: "transparent"}}>A</p>
                      Buy Ticket
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
