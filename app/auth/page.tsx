
const Auth = ()=>{
    return(
        <div className="grid lg:grid-cols-2 grid-cols-1 place-items-center mt-4 ml-[100px] mr-[100px]">
            <div className="flex flex-col rounded shadow-lg px-6 py-6 w-[400px] h-[400px]">
                <form className="">
                    <h2 className="text-xl text-gray-700 text-center mb-[10px]">Sign In</h2>
                    <label htmlFor="email" className="mt-[20px] text-gray-700 text-sm">Email</label>
                    <input id="email" type="text" className="w-full px-2 py-2 border-2 border-gray-200 rounded mt-[10px] mb-[10px] focus:outline-none focus:ring focus:ring-green-300"/>
                    <label htmlFor="pass" className="mt-[20px] text-gray-700 text-sm">Password</label>
                    <input id="pass" type="password" className="w-full px-2 py-2 border-2 border-gray-200 rounded mt-[10px] focus:outline-none focus:ring focus:ring-green-300"/>
                    <button type="submit" className="border mt-[20px] w-full px-2 py-3 rounded bg-blue-500 text-white hover:bg-blue-600">Sign In</button>
                </form>
                <button type="button" className="border-2 border-blue-500 mt-[20px] w-full px-2 py-3 rounded  text-gray-700 hover:bg-lime-50">Sign In w/ Google</button>
            </div>
            <div className="flex flex-col rounded shadow-lg px-6 py-6 w-[400px] h-[400px]">
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
            </div>
        </div>
    )
}

export default Auth;