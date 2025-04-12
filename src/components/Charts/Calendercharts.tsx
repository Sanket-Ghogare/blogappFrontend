import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const Calendercharts: React.FC = () => {
  const [totalUser, setTotalUsers] = useState<number>(0);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [totalPost, setTotalPost] = useState<number>(0);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/getUsers`);
      if (response.ok) {
        const data=await response.json();
        setTotalUsers(data);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/blogs`);

      if (response.ok) {
        const data=await response.json();

        setTotalPost(data.length);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchComment = async () => {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/comment/getcomment`);
        if (response.ok) {
            const data=await response.json();
    
        setTotalComments(data.length);
      }
    };
    
    fetchComment();
  }, []);

  const data = [
    ['Year', 'Users', 'Posts', 'Comments'],
    // ['2024', 3, 4, 5],
    ['2024', totalUser, totalPost, totalComments],
  ];

  const options = {
    chart: {
      title: 'Application Performance',
      subtitle: 'Users, Posts, and Comments:2024',
    },
  };

  return (
    <Chart
    className='py-20 '
      chartType="Bar"
      data={data}
      options={options}
    />
  );
};

export default Calendercharts;
