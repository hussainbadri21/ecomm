const PasswordField = ({ formData, setFormData }: { formData: Record<string, string>, setFormData: (formData: any) => void }) => {
    return (
        <>
            <label className='text-black pt-8' htmlFor="password">Password</label>
            <input className="p-2 rounded" type="password" id="password" name="password" placeholder="Enter a password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        </>
    )
}

export default PasswordField
