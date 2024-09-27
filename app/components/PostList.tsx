import React from 'react'
import Link from 'next/link'

type Post = {
	id: number
	username: string
	topic_slug: string
	topic_id: number
	raw: string
	topic_title: string
}

async function getPosts(): Promise<Post[]> {
	const apiKey = process.env.DISCOURSE_API_KEY
	const apiUsername = process.env.DISCOURSE_API_USERNAME
	const discourseUrl = process.env.DISCOURSE_URL

	if (!apiKey || !apiUsername || !discourseUrl) {
		throw new Error('Missing Discourse configuration')
	}

	const res = await fetch(`${discourseUrl}/posts.json`, {
		headers: {
			'Api-Key': apiKey,
			'Api-Username': apiUsername,
		},
		next: { revalidate: 60 },
	})

	if (!res.ok) {
		throw new Error('Failed to fetch posts')
	}

	const data = await res.json()
	return data.latest_posts
		.filter((post: Post) => {
			const lowercaseUsername = post.username.toLowerCase()
			return lowercaseUsername !== 'system' && lowercaseUsername !== 'moderator'
		})
		.slice(0, 5)
}

export default async function PostList() {
	try {
		const posts = await getPosts()

		return (
			<ul className='space-y-6'>
				{posts.map((post) => (
					<li
						key={post.id}
						className='border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
						<Link
							href={`${process.env.DISCOURSE_URL}/t/${post.topic_slug}/${post.topic_id}`}
							className='block'>
							<h4 className='text-lg text-gray-400 font-semibold mb-1'>{post.topic_title}</h4>
							<p className='text-sm text-gray-500 mb-2'>Post id: {post.id}</p>
							<p className='text-sm text-gray-500 mb-2'>By user: {post.username}</p>
							<p className='text-sm text-gray-500'>{post.raw.substring(0, 100)}...</p>
						</Link>
					</li>
				))}
			</ul>
		)
	} catch (error) {
		console.error('Error fetching posts:', error)
		return <p className='text-red-500'>Error loading posts. Please try again later.</p>
	}
}
