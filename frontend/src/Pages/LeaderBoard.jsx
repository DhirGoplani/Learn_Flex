import React, { useEffect, useState } from "react";
import axios from 'axios';


const dummyLeaderBoard = [
  { id: 1, name: "Mayank", rating: 1920, no_of_question: 340, country: "India" },
  { id: 2, name: "Alex", rating: 1850, no_of_question: 310, country: "USA" },
  { id: 3, name: "Sophia", rating: 1780, no_of_question: 295, country: "UK" },
  { id: 4, name: "Rahul", rating: 1705, no_of_question: 260, country: "India" },
  { id: 5, name: "Kenji", rating: 1650, no_of_question: 240, country: "Japan" },
];


const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderBoardData();
  }, []);

  const fetchLeaderBoardData= async () => {
    try{
      const response=await axios.get()
      if(!response){
        console.log(error)
      }
      setLeaderboard(response.data)
    }
    catch(error){
       console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        
        
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            🏆 Leaderboard
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-3">Rank</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Solved</th>
                <th className="px-6 py-3">Country</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {dummyLeaderBoard.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-semibold">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {user.name}
                  </td>

                  <td className="px-6 py-4 text-blue-600 font-semibold">
                    {user.rating}
                  </td>

                  <td className="px-6 py-4">
                    {user.no_of_question}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-200">
                      {user.country}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default LeaderBoard;