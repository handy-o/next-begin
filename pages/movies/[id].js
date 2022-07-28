import { useRouter } from 'next/router';
import Seo from '../components/Seo';

export default function Detail() {
	const router = useRouter();
	console.log(router);

	return (
		<Seo title='movie'>
			<p>detail</p>
		</Seo>
	);
}
