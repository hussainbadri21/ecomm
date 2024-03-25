const EmailField = ({ formData, setFormData }: { formData: Record<string, string>, setFormData: (formData: any) => void }) => {
    return (
        <>
            <label className='text-black pt-8' htmlFor="email">Email</label>
            <input className="p-2 rounded" type="email" id="email" name="email" placeholder="Enter your email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </>
    )
}

export default EmailField
