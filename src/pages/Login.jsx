import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate()
  const handleUserLogin = (e) => {
    e.preventDefault()
    const [email,password] = [e.target[0].value,e.target[1].value]
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }
  return <>
    <h1>Please LogIN</h1>
    <form onSubmit={handleUserLogin} className="flex flex-col gap-3">
      <input className="p-2 mt-2" type="email" placeholder="Enter your email" />
      <input className="p-2" type="password" placeholder="Enter your Password" />
      <input className="p-2 mt-2" type="submit" />
    </form>
  </>
}
export default Login


