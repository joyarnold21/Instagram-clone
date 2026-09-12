import React, { useEffect, useState } from 'react'

const defaultPosts = [
  {
    id: 1,
    username: 'foodie_world',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    postImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    caption: 'Pizza night 🍕❤️',
    likes: 1245,
    comments: [
      { id: 101, username: 'john_food', text: 'That pizza looks amazing! 🍕' },
      { id: 102, username: 'sarah_eats', text: 'I need to try this 😍' },
    ],
  },
  {
    id: 2,
    username: 'travel_diaries',
    profileImage: 'https://i.pravatar.cc/150?img=32',
    postImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    caption: 'Beautiful places 🌊✨',
    likes: 2387,
    comments: [{ id: 201, username: 'alex_travels', text: 'Wow! What a beautiful view 🌊' }],
  },
  {
    id: 3,
    username: 'daily_coding',
    profileImage: 'https://i.pravatar.cc/150?img=45',
    postImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    caption: 'Coding all day 💻🔥',
    likes: 754,
    comments: [{ id: 301, username: 'react_dev', text: 'Keep coding! 💻🔥' }],
  },
]

function Posts() {
  const [posts, setPosts] = useState(defaultPosts)

  useEffect(() => {
    let isMounted = true

    fetch('http://localhost:3000/post')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load posts: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setPosts(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setPosts(defaultPosts)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="feed-posts">
      {posts.map((post) => (
        <article className="post-card" key={post.id}>
          <div className="post-header d-flex align-items-center gap-3">
            <img
              className="dp rounded-circle"
              src={post.profileImage}
              alt={`${post.username} profile`}
              onError={(event) => {
                event.target.src = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80'
              }}
            />
            <h5>{post.username}</h5>
          </div>

          <img
            className="post"
            src={post.postImage}
            alt={`${post.username} post`}
            onError={(event) => {
              event.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
            }}
          />

          <div className="post-actions">
            <i className="bi bi-heart" aria-label="like" />
            <i className="bi bi-chat" aria-label="comment" />
            <i className="bi bi-send" aria-label="share" />
          </div>

          <div className="post-likes">
            <b>{post.likes} likes</b>
          </div>

          <div className="post-caption">
            <strong>{post.username}</strong> {post.caption}
          </div>

          {post.comments && post.comments.length > 0 && (
            <div className="post-comments">
              {post.comments.slice(0, 2).map((comment) => (
                <div key={comment.id}>
                  <strong>{comment.username}</strong> {comment.text}
                </div>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

export default Posts
