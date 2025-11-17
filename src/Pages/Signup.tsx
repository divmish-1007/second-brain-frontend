import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router";



export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigat = useNavigate()

    async function  signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password 
        })
        navigat('/signin')
        alert("You have signed up!")
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-md border min-w-48 p-8">
            <Input refrence={usernameRef} placeholder="Username" type="text"/>
            <Input refrence={passwordRef} placeholder="Password" type="password" />

            <div className="flex justify-center pt-2">
                <Button onClick={signup} variant="primary" title="Signup" fullWidth={true} loading={false}/>
            </div>
            
        </div>

    </div>
}