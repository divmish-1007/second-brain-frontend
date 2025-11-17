
export function Input({placeholder, type, refrence }: {placeholder:string, type:string, refrence?:any}){
    return <div>
        <input ref={refrence} type={type} placeholder={placeholder} className="py-2 px-3 m-2 border" ></input>
    </div>
} 