import React from 'react'
import styles from './index.module.scss'

const list = [
  {
    name: '张三',
    number: 123456,
    chinese: 90,
    math: 56,
    english: 100
  },
  {
    name: '李四',
    number: 189456,
    chinese: 70,
    math: 89,
    english: 70
  },
  {
    name: '王五',
    number: 189597,
    chinese: 72,
    math: 79,
    english: 98
  },
  {
    name: '王五',
    number: 189596,
    chinese: 72,
    math: 79,
    english: 98
  }
]

const title_list: string[] = ['序号', '姓名', '学号', '语文', '数学', '英语']

const FixedTable = () => {
  return (
    <div>
      <div>
        <table className={styles.table}>
          <colgroup>
            { title_list.map(title => (<col key={title} style={{width: 100}}/>)) }
          </colgroup>
          <thead>
            <tr>
              {title_list.map(title => (<th key={title} scope={'col'}>{ title }</th>)) }
            </tr>
          </thead>
        </table>
      </div>
      <div>
        <table className={styles.table}>
          <colgroup>
            { title_list.map(title => (<col key={title}/>)) }
          </colgroup>
          <tbody className={styles.body}>
            {
              list.map((student, i) => (
                <tr key={student.number}>
                  <td scope={'col'}>{i + 1}</td>
                  <td scope={'col'}>{student.name}</td>
                  <td>{student.number}</td>
                  <td>{ student.chinese }</td>
                  <td>{ student.math }</td>
                  <td>{ student.english }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FixedTable