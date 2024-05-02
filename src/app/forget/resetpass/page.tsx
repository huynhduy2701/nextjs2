import TitlePage from "@/components/titlepage"
import ResetPass from "./resetpass"

const page=()=>{
    return (
        <div>
            <TitlePage message={'Reset password'}/>
            <ResetPass/>
        </div>
    )
}
export default page