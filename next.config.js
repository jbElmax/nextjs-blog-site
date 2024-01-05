/** @type {import('next').NextConfig} */
//const nextConfig = {}

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'source.unsplash.com',

        },
      ],
    },
    env:{
      baseUrl:'https://www.indiamart.com/',
    },
    env:{
      apiUrl:'https://blog-api-xit6.onrender.com'      
    },

  }
  
