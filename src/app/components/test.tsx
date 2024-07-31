'use client'
import React from 'react'
import { useSession } from "next-auth/react"

const Test = () => {
    const { data: session1 } = useSession();
  return (
    <div>
      <h1>{JSON.stringify(session1)}</h1>
    </div>
  )
}

export default Test
