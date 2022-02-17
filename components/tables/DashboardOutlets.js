import { useEffect, useState } from 'react';

export default function DashboardOutlets({ outlets, transactions, visits }) {
  const [outletsCompleteData, setOutletsCompleteData] = useState([]);

  useEffect(() => {
    const outletInitial = [];
    for (let i = 0; i < outlets.length; i++) {
      let transactionCount = 0;
      let earnings = 0;
      for (let j = 0; j < transactions.length; j++) {
        if (outlets[i].id === transactions[j].outletId) {
          transactionCount++;
          earnings += transactions[j].totalPrice;
        }
      }
      let visitCount = 0;
      for (let k = 0; k < visits.length; k++) {
        if (outlets[i].id === visits[k].outletId) {
          visitCount++;
        }
      }

      outletInitial.push({
        name: outlets[i].name,
        transactionCount,
        visitCount,
        earnings,
      });
    }
    setOutletsCompleteData(outletInitial);
  }, []);
  return (
    <table className='table w-full table-zebra'>
      <thead>
        <tr>
          <th></th>
          <th>Outlet Name</th>
          <th>Transactions</th>
          <th>Visitors</th>
          <th>Total Earnings</th>
        </tr>
      </thead>
      <tbody>
        {outletsCompleteData.map((outlet, i) => (
          <tr key={i}>
            <th>{i + 1}</th>
            <td>{outlet.name}</td>
            <td>{outlet.transactionCount}</td>
            <td>{outlet.visitCount}</td>
            <td>{outlet.earnings}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
