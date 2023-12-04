import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { collection, query, where, getDocs, doc, getDoc,setDoc,updateDoc,serverTimestamp} from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {

  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      const arr = []
      querySnapshot.forEach((doc) => {
        // addUser(doc.data());
        arr.push(doc.data())
      });
      setUsers(arr);
    }
    catch (error) {
      console.log(error);
    }
  }
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async (user) => {
    console.log(user);
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

       console.log(res.exists())
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        console.log("chats created")
        //create user chats
        const user1 = await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("I am doc 1"+user1)

        const user2  = await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("I am doc2"+user2)
      }
    } catch (err) {
      
    }

    setUsers([]);
    setUsername("");
}

return (
  <div className="search  border-solid border-b-2  border-black">
    <div className="searchForm">
      <input
      className="max-w-full border-0 outline-none"
        type="textsearch"
        placeholder="Find a user"
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
    </div>
    {console.log(users)}
    <div>
      {users.map((user) => (
        <div className="flex justify-center items-center cursor-pointer" key={user.id} onClick={() => handleSelect(user)}>
          <img width="40px" src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Search