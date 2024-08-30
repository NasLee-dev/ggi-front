
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'localhost:3000',
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.iconfinder.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ggi.co.kr',
      },
      {
        protocol: 'http',
        hostname: 'file.ggi.co.kr',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/req:path*',
        destination: 'https://api.vworld.kr/req:path*',
      },
      {
        source: '/addrlink/:path*',
        destination: 'https://www.juso.go.kr/addrlink:path*',
      },
      {
        source: '/ggi/api/bid-form/:path*',
        destination: `https://dev-api.ggi.co.kr:8443/ggi/api/bid-form/:path*`,
      },
      {
        source: '/ggi/api/auth/:path*',
        destination: `https://dev-api.ggi.co.kr:8443/ggi/api/auth/:path*`,
      },
      {
        source: '/ggi/api/map/:path*',
        destination: `https://dev-api.ggi.co.kr:8443/ggi/api/map/:path*`,
      },
      {
        source: '/ggi/api/location/:path*',
        destination: `https://dev-api.ggi.co.kr:8443/ggi/api/location/:path*`,
      },
      {
        source: '/MapAppServer/:path*',
        destination: `https://vapi.dawulmap.com:8443/MapAppServer/:path*`,
      },
      {
        source: '/ggi/api/interest/map/:path*',
        destination: `https://dev-api.ggi.co.kr:8443/ggi/api/interest/map/:path*`,
      },
      {
        source: '/irosDungki/:path*',
        destination: `http://apiservicedata.co.kr/irosDungki/:path*`,
      },
      {
        source: '/member/:path*',
        destination: `https://www.ggi.co.kr/member/:path*`,
      },
      {
        source: '/ggi/api/dm/:path*',
        destination: `https://dev-api.ggi.co.kr:8443/ggi/api/dm/:path*`,
      },
    ]
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.alias['react-refresh/runtime'] = false;
    }
    return config;
  }
}

module.exports = nextConfig
