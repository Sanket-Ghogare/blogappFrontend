import React from 'react'

const About = () => {
  return (
    <div className=' dark:bg-gray-800 h-screen dark:text-white'>
        <div className='relative   dark:bg-gray-800'  >
        
        <img
          src="https://t3.ftcdn.net/jpg/05/46/87/90/240_F_546879008_Q6ki464WT8YNuucGcKZZvOwyVnt5NaEy.jpg"
         
          className='w-full h-80'
          alt="image"
         
        />
  
      </div>
      <div className=' dark:bg-gray-800'>
        <h6 className='text-center text-gray-500 font-bold text-3xl mt-6'>About Our Website</h6>
        <div className=' dark:bg-gray-800'>
            <p className='mx-10 justify-center my-9'>
            In this blogging application, I've implemented a robust authentication system that ensures only authorized users can perform specific actions, with each blog post associated with its creator for exclusive editing and deletion rights. Comments are tied to individual users, granting them control over their contributions, and an admin dashboard provides privileged access to manage the platform, including the ability to delete any blog post if necessary. Advanced security measures, such as encryption protocols and regular audits, safeguard user data, while seamless integration with social media networks enhances user reach and community interaction. Collaborative editing and group discussions foster teamwork and idea-sharing, complemented by user-driven updates and feedback-driven improvements. To maintain content quality, spam combat measures and moderation tools are in place, ensuring a secure, collaborative, and enriching blogging experience for all users.
            </p>
        </div>
      </div>
    </div>
  )
}

export default About
