import Header from "../../components/authentication/Header"
import Login from "../../components/authentication/Login"

export default function LoginPage(){
    return(
        <div className="min-h-[80vh] grid grid-cols-1 content-center">
            <div className="w-[100%]">
             <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Login/>
            </div>
        </div>
    )
}
