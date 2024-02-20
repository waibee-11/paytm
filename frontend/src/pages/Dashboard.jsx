import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    return <div className="mx-5 my-2">
        <Appbar />
        <Balance />
        <Users />
    </div>
}