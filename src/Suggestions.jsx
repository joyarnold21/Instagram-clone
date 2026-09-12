import React, { useState, useEffect } from 'react'

const defaultProfile = {
  id: 1,
  username: 'foodie_world',
  profileImage: 'https://i.pravatar.cc/150?img=12',
  bio: 'Exploring the world one bite at a time 🍕🍣🍰',
  followers: 1200,
  following: 300,
  posts: 45,
}

const defaultSuggestions = [
  { id: 1, username: 'travel_diaries', profileImage: 'https://i.pravatar.cc/150?img=32' },
  { id: 2, username: 'daily_coding', profileImage: 'https://i.pravatar.cc/150?img=45' },
  { id: 3, username: 'nature_lover', profileImage: 'https://i.pravatar.cc/150?img=28' },
]

function Suggestions() {
  const [profile, setProfile] = useState(defaultProfile)
  const [suggestions, setSuggestions] = useState(defaultSuggestions)

  useEffect(() => {
    let isMounted = true

    fetch('http://localhost:3000/profile')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Profile load failed')
        }
        return response.json()
      })
      .then((data) => {
        if (isMounted && data) {
          setProfile(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setProfile(defaultProfile)
        }
      })

    fetch('http://localhost:3000/suggestions')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Suggestions load failed')
        }
        return response.json()
      })
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setSuggestions(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setSuggestions(defaultSuggestions)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="suggestions-panel">
      <div className="suggestions w-75 m-4">
        <div className="d-flex gap-3 align-items-center profile-row">
          <img
            className="dp rounded-circle"
            src={profile.profileImage}
            alt="Profile pic"
            onError={(event) => {
              event.target.src = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80'
            }}
          />
          <div>
            <h5>{profile.username}</h5>
            <small>{profile.bio}</small>
          </div>
          <small className="ms-auto text-primary">switch</small>
        </div>

        <div className="d-flex align-items-center suggestion-header">
          <p>Suggested for you</p>
          <b className="ms-auto">See All</b>
        </div>

        <div className="d-flex flex-column gap-2">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="soomitta d-flex gap-3 align-items-center">
              <img
                className="dp rounded-circle"
                src={suggestion.profileImage}
                alt="Profile pic"
                onError={(event) => {
                  event.target.src = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80'
                }}
              />
              <h5>{suggestion.username}</h5>
              <b className="ms-auto text-primary">Follow</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Suggestions
