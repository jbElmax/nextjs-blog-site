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
      baseUrl:'https://www.indiamart.com/'
    }
  }
  
