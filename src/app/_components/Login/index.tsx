import Container from "../Container"

const LoginForm = () => {
    return (
        <Container type="login">
            <div className="flex flex-col w-3/4 pt-4 -mb-8 text2xl text-center text-black">
                <h2 className="font-bold">Welcome back to ECOMMERCE</h2>
                <div className="-mt-2">The next gen business marketplace</div>
            </div>
            <form className="flex flex-col w-3/4 pt-8">
                <label className='text-black pt-8' htmlFor="email">Email</label>
                <input className="p-2 rounded" type="email" id="email" name="email" placeholder="Enter your email" />
                <label className='text-black pt-8' htmlFor="password">Password</label>
                <input className="p-2 rounded" type="password" id="password" name="password" placeholder="Enter your password" />
                <button className="bg-black hover:bg-gray-700 text-white font-bold py-4 px-4 rounded mt-8 uppercase" type="submit">Login</button>
            </form >
            <div className="border  border-solid mt-8 border-gray-300 w-3/4" />
        </Container >
    )
}
export default LoginForm;