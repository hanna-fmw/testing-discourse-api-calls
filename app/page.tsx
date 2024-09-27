import PostList from './components/PostList'

export default function Home() {
	return (
		<main className='container mx-auto p-4 bg-black'>
			<h1 className='text-3xl font-bold mb-4 text-gray-400'>Latest Discourse Posts</h1>
			<section>
				<PostList />
			</section>
		</main>
	)
}
