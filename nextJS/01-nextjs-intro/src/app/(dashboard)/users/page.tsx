import Link from 'next/link'
import React from 'react'


const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
]

export default function UserPage() {
  return (
    <div className='flex flex-col flex-1 items-center justify-center'>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
             <Link href={`/users/${user.id}`} className='text-blue-500 hover:underline'>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}