import React, { useState } from 'react'
import { Button } from 'antd'

const Home: React.FC = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      Hello This is Home Page!!!!
      <Button
        type={'primary'}
        size={'large'}
        onClick={() => setCount(count + 1)}
      >click me { count } times</Button>
    </div>
  )
}

export default Home