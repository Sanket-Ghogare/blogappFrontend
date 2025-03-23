import React, { useEffect, useState } from 'react'
import { categories } from '../../Data/data';
import {Link} from 'react-router-dom';

// interface Data{
//  _id:String,
//  isAdmin:boolean
// }
const Category = () => {
  //  const[isAdmin , setIsAdmin]=useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleCategoryClick = (categoryType:string) => {
      setSelectedCategory(categoryType);
    };
  
    // useEffect(()=>{
    //   const token: string | null = localStorage.getItem('accessToken');
    //   if(token){
    //     const decodedToken = jwt_decode(token) as DecodedToken;
    //     const isAdmin = decodedToken.isAdmin;
    //     setIsAdmin(isAdmin);

    //   }
    // })

    const isAdmin = localStorage.getItem("isAdmin");


  return (
    <>
    <div  className='dark:bg-gray-800'>
   

      <div className='underline text-blue-700 flex ss:ml-1 sm:ml-0 xxs:ml-0'>
    <table  >
        <thead>
            <tr >
                <td  className='py-3 xxs:px-10 sm:px-10 ss:px-7  border border-gray-300'>
               <Link to="/home" className=' cursor-pointer'> All Categories</Link> 
                </td>
            </tr>
        </thead>

        <tbody >
            {
                categories.map(category=>(
                    <tr key={category.id} >
                     <td  className='xxs:py-3 sm:py-3 sm:px-16 xxs:px-16  ss:px-8 mb-4 ss:py-2 text-center border border-gray-300' >
                        <Link to={`/${category.type}`} 
                         className={`cursor-pointer ${selectedCategory === category.type ? 'font-bold' : ''}`}
                         onClick={()=>handleCategoryClick(category.type)}
                         >
                            {category.type}
                            </Link>
                     </td>
                    </tr>
                ))
            }
        </tbody>
    </table>
   


      </div>

      <div className=' w-full mt-2'>
      {isAdmin === 'true' && (
    <Link to='/admin/home'>
      <button className=' bg-blue-600 uppercase text-white ml-3 my-3 px-10  py-1 rounded-md' >Admin</button>
      </Link>
      )}
      </div>
    </div>
    </>
  )
}

export default Category
