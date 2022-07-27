const API_KEY = process.env.API_KEY;
//const API_KEY = '5f98397aa69a13327dd1b329487d998c';

module.exports = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/old-blog/:path*',
				destination: '/new-sexy-blog/:path*',
				permanent: false,
			},
		];
	},
	async rewrites() {
		return [
			{
				source: '/api/movies',
				destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
			},
			{
				source: '/api/movies/:id',
				destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
			},
		];
	},
};
