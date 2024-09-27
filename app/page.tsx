import PostList from './components/PostList'

export default function Home() {
	return (
		<main className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Welcome to Our Community</h1>
			<section>
				<h2 className='text-xl font-semibold mb-2'>Latest Discourse Posts</h2>
				<PostList />
			</section>
		</main>
	)
}
