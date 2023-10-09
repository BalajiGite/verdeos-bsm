import React from 'react';

const Table = ({ sites }) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="border-b-2 px-4 py-2">ID</th>
          <th className="border-b-2 px-4 py-2">Name</th>
          <th className="border-b-2 px-4 py-2">Color</th>
          <th className="border-b-2 px-4 py-2">Readings</th>
        </tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <tr key={site.id}>
            <td className="border-b px-4 py-2">{site.id}</td>
            <td className="border-b px-4 py-2">{site.name}</td>
            <td className="border-b px-4 py-2" ><div className="w-2 h-2 rounded-full bg-orange-500 mr-2 ml-2"></div></td>
            <td className="border-b px-4 py-2">{site.readings}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;