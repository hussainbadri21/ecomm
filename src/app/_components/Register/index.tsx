import Container from "../Container"

const RegistrationForm = () => {
    return (
        <Container type="signup">
            <form className="flex flex-col w-3/4 pt-8">
                <label className='text-black' htmlFor="name">Name</label>
                <input className="p-2 rounded" type="text" id="name" name="name" placeholder="Enter your name" />
                <label className='text-black pt-8' htmlFor="email">Email</label>
                <input className="p-2 rounded" type="email" id="email" name="email" placeholder="Enter your email" />
                <label className='text-black pt-8' htmlFor="password">Password</label>
                <input className="p-2 rounded" type="password" id="password" name="password" placeholder="Enter a password" />
                <button className="bg-black hover:bg-gray-700 text-white font-bold py-4 px-4 rounded mt-8 uppercase" type="submit">Create account</button>
            </form >
        </Container>
    )
}
export default RegistrationForm;