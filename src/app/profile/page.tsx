import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth'

interface User{
  id: number;
  name: string;
}

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users',
  {cache: 'no-store'});
    const users: User[] = await res.json();
  return (
    <div>
      welcome profile {session?.user.reward}
    <ul>
      {users.map(user => <li key={user.id}  >{user.name}</li>)}
    </ul>
    </div>

  )
}

export default Profile
