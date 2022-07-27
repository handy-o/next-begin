/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

const API_KEY = process.env.API_KEY;
module.exports = {
	reactStricMode: true,
	async redirects() {
		return [
			// array 를 return
			{
				// 객체로 된 array
				source: '/contact',
				destination: '/form',
				permanent: false,
			},
			{
				source: '/old-blog/:path', //뒤에 붙은 :paht(ex_postID)는 동일
				destination: '/new-blog/:path', //catch 된 것
				permanent: false,
			},
			{
				source: '/old-blog/:path*', //뒤에 어떤 경로가 붙어도
				destination: '/new-blog/:path*', //동일하게 catch 된 것
				permanent: false,
			},
		];
	},

	async rewrites() {
		return [
			{
				source: '/api/movies', //<<fecth 주소에 이 URL을 넣음
				destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
			},
			{
				source: '/api/movies/:id',
				destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
			},
		];
	},
};
