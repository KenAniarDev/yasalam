import { useState, useEffect } from 'react';

export default function DashboardNationality({ memberData }) {
  const [membersNationality, setMembersNationality] = useState([]);

  useEffect(() => {
    const nations = [];
    memberData.forEach((member) => {
      nations.push(member.nationality);
    });
    const nationalities = [...new Set(nations)];
    const filteredMembersNationality = [];
    for (let i = 0; i < nationalities.length; i++) {
      let count = 0;
      for (let j = 0; j < memberData.length; j++) {
        if (nationalities[i] === memberData[j].nationality) {
          count++;
        }
      }
      filteredMembersNationality.push({ name: nationalities[i], count });
    }
    setMembersNationality(filteredMembersNationality);
  }, []);
  return (
    <table className='table w-full table-zebra'>
      <thead>
        <tr>
          <th></th>
          <th>Nationality</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {membersNationality.map((nationality, i) => (
          <tr key={i}>
            <td></td>
            <td>{nationality.name}</td>
            <td>{nationality.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
