const nextConfig = {
  reactStrictMode: true,
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: '**',
              port: '',
              pathname: '**',
          },
      ],
  },
  // images: {
  //     remotePatterns: [
  //       {
  //         protocol: "https",
  //         hostname: "*",
  //       },
  //     ],
  //     domains: ['*'],
  //   },
};

module.exports = nextConfig;
