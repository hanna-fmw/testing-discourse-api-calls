import PostList from './components/PostList'

export default function Home() {
	return (
		<main className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-4'>Latest Discourse Posts</h1>
			<section>
				<PostList />
			</section>
		</main>
	)
}
