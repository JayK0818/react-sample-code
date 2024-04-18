import React from 'react'
import styles from './home.module.scss'
import { Button, Input, List, Avatar } from 'antd'
import { SearchOutlined } from '@ant-design/icons';

const singerList = [
  {
    id: 1,
    firstName: 'Lebron',
    lastName: 'James',
    twitter: '13444553',
    avatar: 'https://q0.itc.cn/q_70/images03/20240411/175c5b1c318e421d9b535162b7a5246d.jpeg'
  },
  {
    id: 2,
    firstName: 'Kevin',
    lastName: 'Durant',
    twitter: '893248922',
    avatar: 'https://img1.baidu.com/it/u=1062593979,789918170&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1000'
  },
  {
    id: 3,
    firstName: 'Kyrie',
    lastName: 'Irving',
    twitter: '578514836',
    avatar: 'https://pic.rmb.bdstatic.com/bjh/76c1cfb82fbd12a0e61780269245ceb45733.jpeg@h_1280'
  },
  {
    id: 4,
    firstName: 'Anthony',
    lastName: 'Davis',
    twitter: '148932892',
    avatar: 'https://bkimg.cdn.bcebos.com/pic/2934349b033b5bb5738998fa39d3d539b600bc5c'
  }
]

const Home = () => {
  return (
    <div className={styles.page}>
      <div className={styles['side-bar']}>
        <h3>React Router Contacts</h3>
        <div className={styles.header}>
          <Input prefix={ <SearchOutlined/> } />
          <Button type='primary'>New</Button>
        </div>
        <List
          itemLayout='horizontal'
          dataSource={ singerList }
          renderItem={(item) => (
            <List.Item
            >
              <List.Item.Meta
                title={item.firstName + '-' + item.lastName}
                avatar={<Avatar src={item.avatar} />}
                description={
                  <div>Twitter: {item.twitter}</div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default Home