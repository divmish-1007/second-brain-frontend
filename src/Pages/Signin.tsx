import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router";

export function Signin(){

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    async function  signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value

        const response = await axios.post(`${BACKEND_URL}/api/v1/signIN`, {
            username,
            password 
        })
        const jwt = response.data.token
        localStorage.setItem("token", jwt)
        // redirect the user dashboard page
        navigate("/dashboard")
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-md border min-w-48 p-8">
            <Input refrence = {usernameRef}placeholder="Username" type="text"/>
            <Input refrence={passwordRef} placeholder="Password" type="password" />

            <div className="flex justify-center pt-2">
                <Button onClick={signin} variant="primary" title="Signin" fullWidth={true} />
            </div>
            
        </div>

    </div>
}