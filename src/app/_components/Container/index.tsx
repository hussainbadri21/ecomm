import Link from "next/link";

const Container = ({ children, type }: { type: string; children: React.ReactNode }) => {
    return (
        <div className=" py-4 sm:py-16 my-16 flex flex-col items-center border-solid boder rounded-xl border-gray-200 mx-2 sm:mx-auto sm:w-1/3">
            <div className="text-3xl font-bold text-black text-center">{
                type === 'signup' ? 'Create your account' : type === 'login' ? 'Login' : type === 'verification' ? 'Verify your email' : 'Please mark your interests!'}</div>
            {children}
            {['signup', 'login'].includes(type) &&
                <div className="flex flex-row items-center text-md text-black mt-8">{type === 'signup' ? 'Have an Account?' : 'Don’t have an Account? '}
                    &nbsp;
                    <b> <Link className="no-underline text-black hover:text-gray-700 uppercase" href={`/${type === 'signup' ? 'login' : 'register'}`}>{type === 'signup' ? 'Login' : 'Sign Up'}</Link></b>
                </div>
            }
        </div>
    );
};

export default Container;