import React from 'react'
import { Link, useParams } from 'react-router-dom'

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

function ViewStory() {
  const { id } = useParams()
  const [story, setStory] = React.useState(() => {
    const fallback = defaultStories.find((item) => String(item.id) === String(id)) || defaultStories[0]
    return fallback
  })

  React.useEffect(() => {
    let isMounted = true
    const fallback = defaultStories.find((item) => String(item.id) === String(id)) || defaultStories[0]

    fetch(`http://localhost:3000/story/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load story: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        if (isMounted && data) {
          setStory(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setStory(fallback)
        }
      })

    return () => {
      isMounted = false
    }
  }, [id])

  return (
    <div className="story-view-wrap">
      <div className="story-view-card">
        <div className="story-view-header">
          <Link to="/" className="story-back">← Back</Link>
          <h1>{story?.username || 'Instagram Story'}</h1>
        </div>

        <img
          src={story?.postImage || story?.profileImage}
          alt={`${story?.username || 'story'} story`}
          className="story-view-image"
          onError={(event) => {
            event.target.src = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80'
          }}
        />
      </div>
    </div>
  )
}

export default ViewStory
