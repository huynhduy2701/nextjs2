import TitlePage from "@/components/titlepage"
import './stylle.scss'
import FindEmail from "./findEmail"
const page =()=>{
    
    return(
        <div className="forget">
            <TitlePage message={"Forget Password"}/>
            <FindEmail/>
        </div>
    )
}
export default page