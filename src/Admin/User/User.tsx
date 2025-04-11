import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import React from "react";

interface Post {
  _id: string;
  title: string;
  image:string;
  content: string;
  category:string;
  date:string;
 author:string;
}
const Users:React.FC = () => {
    const [users, setUsers] =useState<Post[]>([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [media , setMedia]=useState(window.innerWidth>400);
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:5000/api/blogs');
            if (response.ok) {
                const post=await response.json();
                setUsers(post);
            }
            
        }
        fetchUsers();
    }, [category])

    // const deletePost = async (id:string) => {
    //     const response=await fetch(`http://localhost:5000/api/delete/${id}`)
    //     setUsers(users.filter(post => post._id !== id));
    // }

    const Delete=async(postId:string)=>{
    
        const response=await fetch(`http://localhost:5000/api/deletepost/${postId}`,{
          method:'DELETE',
        
      });
    //   console.log(response);
    
     
      }

    return (
        <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 ">
            <h2 className="text-2xl font-bold mb-4  text-center dark:text-white">User List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y dark:text-white divide-gray-200">
                    <thead className="bg-gray-50 dark:text-white dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3  text-xs font-medium  dark:text-white text-gray-500 uppercase tracking-wider text-center">Username</th>
                            <th scope="col" className="px-6 py-3  text-xs font-medium  dark:text-white text-gray-500 uppercase tracking-wider text-center">Title</th>
                            <th scope="col" className="px-6 py-3  text-xs font-medium  dark:text-white text-gray-500 uppercase tracking-wider text-center">Categories</th>
                            <th scope="col" className="px-6 py-3  text-xs font-medium  dark:text-white text-gray-500 uppercase tracking-wider text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:text-gray-500 dark:bg-gray-800 divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-center">{user.author}</td>
                                <td className="px-6 py-4 whitespace-nowrap  text-center">{user.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap  text-center">{user.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap  text-center">
                                    <button
                                        onClick={() => Delete(user._id)}
                                        className="px-4 justify-end py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
