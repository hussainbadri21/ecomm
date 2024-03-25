import { useState } from 'react'

const PasswordField = ({ formData, setFormData }: { formData: Record<string, string>, setFormData: (formData: any) => void }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <>
            <label className='text-black pt-8' htmlFor="password">Password</label>
            <div className='flex flex-row'>
                <input className="p-2 rounded  w-full" type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter a password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <button className='p-2 rounded cursor-pointer bg-white underline text-gray-500 hover:text-gray-700' onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword) }}>Show</button>
            </div>
        </>
    )
}

export default PasswordField
