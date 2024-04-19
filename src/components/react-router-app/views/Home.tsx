import React from 'react'
import styles from './home.module.scss'
import { Button, Input, List, Avatar } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLoaderData, Form, useNavigation } from 'react-router-dom'
import type { PlayerList } from '../interface'

const Home = () => {
  const navigate = useNavigate()
  const navigation = useNavigation()
  console.log('navigation:', navigation)
  const {playerList} = useLoaderData() as { playerList: PlayerList[] }
  console.log(playerList)
  const handleGetPlayerDetail = (player: any): void => {
    navigate(`/player/${player.id}`)
  }
  const handleEditPlayer = (player: any): void => {
    navigate(`player/${player.id}/edit`)
  }
  return (
    <div className={styles.page}>
      <div className={styles['side-bar']}>
        <h3>React Router Contacts</h3>
        <div className={styles.header}>
          <Form method='post'>
            <Input prefix={<SearchOutlined />} />
            <button type='submit'>New</button>
            {/* <Button type='submit'>New</Button> */}
          </Form>
        </div>
        <List
          itemLayout='horizontal'
          dataSource={ playerList }
          renderItem={(item) => (
            <List.Item
            >
              <List.Item.Meta
                title={item.firstName + '-' + item.lastName}
                avatar={<Avatar src={item.avatar} />}
                description={
                  <div>
                    <div>Twitter: {item.twitter}</div>
                    <Button type='link' onClick={() => handleEditPlayer(item)}>Edit</Button>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <div className={styles.container}><Outlet/></div>
    </div>
  )
}

export default Home