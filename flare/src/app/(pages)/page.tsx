export default function Home() {
  return (
    <div>
      <div className="header">
        <h1>Trade</h1>
      </div>

      <div className="tabs">
        <div className="tabs-inner">
          <a href="#" className="tab active">
            <p>Spot</p>
          </a>
          <a href="#" className="tab">
            <p>Margin</p>
          </a>
        </div>
      </div>

      <h2>Recent Transactions</h2>
      <div className="transactions">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Pair</th>
                <th>Type</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Filled</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12:30</td>
                <td>
                  <button className="pair-button">ETH/USDT</button>
                </td>
                <td>
                  <button className="type-button">Sell</button>
                </td>
                <td>1,800</td>
                <td>0.5</td>
                <td>0.5</td>
                <td>
                  <button className="status-button">Filled</button>
                </td>
                <td>Details</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
