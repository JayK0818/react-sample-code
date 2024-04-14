import React from 'react'
import styles from './style.module.css'
import s from './index.module.scss'

const singerList = [
  { id: 0, name: '周杰伦' },
  { id: 1, name: '王力宏' }
]

const SingerList = () => {
  return (
    <ul className={ styles.list }>
      {singerList.map(singer => (
        <li key={singer.id} className={ styles.player_item }>{ singer.name }</li>
      )) }
    </ul>
  )
}

// 使用scss
const playerList = [
  {
    id: 1,
    firstName: 'lebron',
    lastName: 'james'
  },
  {
    id: 2,
    firstName: 'kevin',
    lastName: 'durant'
  }
]
const PlayerList = () => {
  return (
    <ul className={ s.list }>
      {
        playerList.map(player => (
          <li key={player.id} className={ s.item }>{player.firstName} - { player.lastName }</li>
        ))
      }
    </ul>
  )
}

const App = () => {
  return (
    <div>
      <SingerList />
      <PlayerList/>
    </div>
  )
}

export default App