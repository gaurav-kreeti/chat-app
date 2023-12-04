import { useState,useEffect } from "react"
function User(){
    const [data, setData] = useState([])
    const fetchInfo = () => {
        return fetch("http://localhost:4000/api/users")
          .then((res) => res.json())
          .then((d) => setData(d.data))
      }
    useEffect(() => {
    fetchInfo()
    }, [])
    console.log(data)
    return <>
    <table>
      <tr>
      <td>Name</td>
      <td>Username</td>
      </tr>
      {data.map((data)=><ListUser user={data}></ListUser>)}
    </table>
    </>
}
function ListUser(props){
  return <tr>
    <td>{props.user.name}</td>
    <td>{props.user.username}</td>
  </tr>
}
export default User
