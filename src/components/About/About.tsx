import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen dark:bg-gray-800 bg-white text-gray-900 dark:text-white">
      {/* Banner Section */}
      <div className="relative">
        <img
          src="https://t3.ftcdn.net/jpg/05/46/87/90/240_F_546879008_Q6ki464WT8YNuucGcKZZvOwyVnt5NaEy.jpg"
          alt="About Banner"
          className="w-full h-64 sm:h-80 md:h-[400px] object-cover object-center"
        />
        {/* Optional overlay or text can go here */}
      </div>

      {/* About Text Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6">
          About Our Website
        </h2>

        <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
          In this blogging application, I've implemented a robust authentication system that ensures only
          authorized users can perform specific actions, with each blog post associated with its creator
          for exclusive editing and deletion rights. Comments are tied to individual users, granting them
          control over their contributions, and an admin dashboard provides privileged access to manage the
          platform, including the ability to delete any blog post if necessary.
          <br /><br />
          Advanced security measures, such as encryption protocols and regular audits, safeguard user data,
          while seamless integration with social media networks enhances user reach and community
          interaction. Collaborative editing and group discussions foster teamwork and idea-sharing,
          complemented by user-driven updates and feedback-driven improvements.
          <br /><br />
          To maintain content quality, spam combat measures and moderation tools are in place, ensuring a
          secure, collaborative, and enriching blogging experience for all users.
        </p>
      </div>
    </div>
  );
};

export default About;
