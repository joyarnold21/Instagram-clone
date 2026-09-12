import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const defaultStories = [
  {
    id: 1,
    username: 'foodie_world',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    postImage: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    username: 'travel_diaries',
    profileImage: 'https://i.pravatar.cc/150?img=32',
    postImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    username: 'daily_coding',
    profileImage: 'https://i.pravatar.cc/150?img=45',
    postImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  },
]

function Stories() {
  const [stories, setStories] = useState(defaultStories)

  useEffect(() => {
    let isMounted = true

    fetch('http://localhost:3000/story')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load stories: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setStories(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setStories(defaultStories)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="story d-flex align-items-center gap-3 overflow-auto p-2">
      {stories.map((story) => (
        <Link key={story.id} to={`/story/${story.id}`} className="story-link">
          <div className="story-item text-center">
            <div className="story-ring">
              <img
                className="story-image"
                src={story.profileImage || story.postImage}
                alt={`${story.username} story`}
                onError={(event) => {
                  event.target.src = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80'
                }}
              />
            </div>
            <small>{story.username}</small>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Stories
