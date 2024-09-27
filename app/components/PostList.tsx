import React from 'react'
import Link from 'next/link'

type Post = {
    id: number
    username: string
    topic_slug: string
    topic_id: number
    raw: string
}

async function getPosts() {
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
    return data.latest_posts as Post[]
}

export default async function PostList() {
    const posts = await getPosts()

    return (
        <ul className="space-y-4">
            {posts.map((post) => (
                <li key={post.id} className="border p-4 rounded-lg">
                    <Link href={`${process.env.DISCOURSE_URL}/t/${post.topic_slug}/${post.topic_id}`}>
                        <h3 className="font-bold">{post.username}</h3>
                        <p className="text-sm text-gray-600">{post.raw.substring(0, 100)}...</p>
                    </Link>
                </li>
            ))}
        </ul>
    )
}