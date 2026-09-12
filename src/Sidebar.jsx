import React from 'react'
import './index.css'
import instagramText from './assets/Instagram_text.png'


function Sidebar() {
  return (
    <div className="m-3" style={{ position: 'fixed' }}>
      <div className="d-flex flex-column gap-3 row gap-4 mb-5">
        <img className="logo-text" src={instagramText} alt="Instagram logo" />
        <div><i className="bi bi-house-door"></i>Home</div>
        <div><i className="bi bi-play-circle"></i>Reels</div>
        <div><i className="bi bi-envelope"></i>Messages</div>
        <div><i className="bi bi-search"></i>Search</div>
        <div><i className="bi bi-bell"></i>Notifications</div>
        <div><i className="bi bi-plus-circle"></i>Create</div>
        <div><i className="bi bi-person"></i>Profile</div>
      </div>

      <div className="position fixed-bottom d-flex flex-column gap-3 mb-3">
        <div><i className="bi bi-chat-dots"></i>Threads</div>
        <div><i className="bi bi-list"></i>More</div>
      </div>
    </div>
  )
}

export default Sidebar