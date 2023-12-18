import React, { useEffect, useState } from 'react'
import { request } from '../../util/fetchAPI'
import Card from '../Card/Card'
import './Users.scss'
export default function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchPropertiesNumber = async() => {
          try {
             const data = await request('/user/find-all-users', 'GET')
             setUsers(data);
          } catch (error) {
            console.error(error)
          }
        }
        fetchPropertiesNumber()
      }, [])


  return (
    <div>
      <div className="Users__Header">Users</div>
      <div
        id="skill"
      >
        <div class="Users__Wrapper">
          {users &&
            users.length !== 0 &&
            users.map((a, key) => {
              return (
                <Card
                  imageUrl={a.profileImg}
                  key={key}
                  label={a.username}
                  cardClass={"Skill"}
                />
              );
            })}
        </div>
      </div>
    </div>
  )
}
