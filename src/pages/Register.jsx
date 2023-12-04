import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { storage, auth, db } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false)
  const navigate = useNavigate();
  const handleUserRegister = async (e) => {
    e.preventDefault()
    const [name, email, password, file] = [e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].files[0]]
    console.log(name)
    console.log(email)
    console.log(password)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res.user)

      const date = new Date().getTime();
      const storageRef = ref(storage, `${name + date}`);

      // const storageRef = ref(storage, email);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName: name,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: name,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            // setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      // setLoading(false);
    }
  };

  return <>
    <h1>Welcome to My APP</h1>
    {err && <span>There was some problem registering user</span>}
    <form onSubmit={handleUserRegister} className="flex flex-col gap-3">
      <input className="p-2 mt-2" type="text" placeholder="Enter your name" />
      <input className="p-2" type="email" placeholder="Enter your email" />
      <input className="p-2" type="password" placeholder="Enter your Password" />
      <input type="file" />
      <input className="p-2 mt-2" type="submit" />
    </form>
  </>
}
export default Register
