import { useRef, useState } from "react";
import {CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType{
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModel({open, onClose}:{open:boolean, onClose:() => void}){

    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const [type, setType] = useState(ContentType.Youtube)

    async function addContent(){
        const title = titleRef.current?.value; 
        const link = linkRef.current?.value

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            title,
            type,
            link
        },{
            headers:{
                "token": localStorage.getItem("token")
            }
        })
        onClose()
    }

    return <div>
        {open && 
          /* === CHANGED: use full-screen fixed inset and high z-index so overlay sits above everything */
          <div className="fixed inset-0 z-[9998] bg-gray-600/60 flex items-center justify-center">
            <div 
              /* keep layout the same but prevent clicks inside modal from reaching backdrop */
              className="flex flex-col justify-center"
              onClick={(e) => e.stopPropagation()}
            >
               {/* === CHANGED: give modal itself a higher z-index so it paints above cards */}
               <span className="relative z-[9999] bg-white opacity-100 p-4 rounded-md">
                 <div className="flex justify-end">
                    <div onClick={onClose} className="cursor-pointer">
                        <CrossIcon/>
                    </div>
                 </div>
                 <div>
                    <Input refrence={titleRef} type="text" placeholder={"Title"} />
                    <Input refrence={linkRef} type="text" placeholder={"Link"} />
                 </div>
                 <div>
                    <h1>Types</h1>
                    <div  className="flex gap-4 p-2">

                        <Button title="Youtube" variant={type === ContentType.Youtube? "primary" : "secondary"} onClick={() =>{
                            setType(ContentType.Youtube)
                        }} />
                        <Button title="Twitter" variant={type === ContentType.Twitter? "primary" : "secondary"} onClick={() =>{
                            setType(ContentType.Twitter)
                        }} />
                    </div>
                 </div>
                 <div className="flex justify-center">
                    <Button onClick={addContent} variant="primary" title="Submit" />
                 </div>
               </span>
            </div>
        </div>}
    </div>
}
