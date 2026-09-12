import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Suggestions from './Suggestions'

function App() {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <Sidebar />
      </aside>

      <main className="app-feed">
        <Feed />
      </main>

      <aside className="app-suggestions">
        <Suggestions />
      </aside>
    </div>
  )
}

export default App
