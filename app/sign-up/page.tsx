import Link from "next/link";
const SignUp = ()=>{
    return(
        <div className="flex flex-col rounded shadow-lg px-6 py-6 w-[400px] mx-auto">
        <form className="">
            
            <h2 className="text-xl text-gray-700 text-center mb-[10px]">Register</h2>
            <label htmlFor="username" className="mt-[20px] text-gray-700 text-sm">Username</label>
            <input id="username" type="text" className="w-full px-2 py-2 border-2 border-gray-200 rounded mt-[10px] mb-[10px] focus:outline-none focus:ring focus:ring-green-300"/>
            <label htmlFor="email" className="mt-[20px] text-gray-700 text-sm">Email</label>
            <input id="email" type="text" className="w-full px-2 py-2 border-2 border-gray-200 rounded mt-[10px] mb-[10px] focus:outline-none focus:ring focus:ring-green-300"/>
            <label htmlFor="pass" className="mt-[20px] text-gray-700 text-sm">Password</label>
            <input id="pass" type="password" className="w-full px-2 py-2 border-2 border-gray-200 rounded mt-[10px] focus:outline-none focus:ring focus:ring-green-300"/>

            <button type="submit" className=" mt-[20px] w-full px-2 py-3 rounded border-2 border-blue-500 text-gray-700 hover:bg-lime-50">Register</button>
        </form>


        <Link href = "/auth" className="text-blue-500 flex mt-[15px] underline">                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
             </svg> Back to Login
        </Link>
    
    </div>
    )
}

export default SignUp;