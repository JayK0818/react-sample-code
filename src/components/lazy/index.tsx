import React, { useState, lazy, Suspense } from 'react'
import { Button } from 'antd'

function delayForDemo(promise: any) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
const User = lazy(() => delayForDemo(import('./components/User')))

const LazyApplication: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const handleToggleVisible = async (): Promise<void> => {
    setIsVisible(!isVisible)
  }
  return (
    <div>
      <Button
        type={'primary'}
        size={'small'}
        onClick={handleToggleVisible}
      >切换显示懒加载组件</Button>
      <hr></hr>
      {
        isVisible && (
          <Suspense fallback={<div>Loading...</div>}>
            <User/>
          </Suspense>
        )
      }
    </div>
  )
}

export default LazyApplication