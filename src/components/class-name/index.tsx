import React, { useState } from 'react'
import classNames from 'classnames'

const ClassNameApp = () => {
  const [visible, setVisible] = useState(false)
  const handleToggleVisible = () => {
    setVisible(!visible)
  }
  return (
    <>
      <button className={classNames({
        visible
      })} onClick={handleToggleVisible}>toggle visible</button>
      <button className={ classNames(['red', 'blue']) }>class name button</button>
    </>
  )
}

export default ClassNameApp