import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Input, Button } from 'antd'

const EditPlayer = () => {
  const player: any = useLoaderData()
  console.log('player:', player)
  return (
    <>
      <div>编辑球员</div>
      <Input value={player.firstName} />
      <Input value={player.lastName} />
      <Input value={player.twitter} />
      <Button type='primary'>Save</Button>
      <Button type='default'>Reset</Button>
    </>
  )
}

export default EditPlayer