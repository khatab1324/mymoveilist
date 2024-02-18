import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { assignSignInFormOpen } from "../movieStore"
function SignInButton(){
    const dispatch=useDispatch()
    const handleClickOpenSignInForm=()=>{
       dispatch(assignSignInFormOpen())
    }
    return <div>
        <Link to={"/signin"}>
        <button className=" bg-blue-400 py-2.5 px-4 rounded-xl absolute top-2 end-2 hover:bg-gray-300 hover:translate-x-1 transition ease-in-out delay-150"> sign in ^_^</button>
        </Link>
    </div>
}
export default SignInButton