'use client'
import Container from "../Container"
import { useState, useEffect, useRef, useContext } from "react";
import UserContext from '~/app/utils/userContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { api } from '~/trpc/react'

const length = 8;

const VerificationBox = () => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const router = useRouter()

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const verifyUser = api.user.verify.useMutation({
        onSuccess: () => {
            toast.success(`Email verified successfully. Welcome to ECOMMERCE, ${userData.name}!`);
            router.push(`/categories`)
        }
    });

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const newOtp = [...otp];
        // allow only one input
        newOtp[index] =
            value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if current field is filled
        if (value && index < length - 1 &&
            inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleClick = (index: number) => {
        inputRefs.current[index]?.setSelectionRange(1, 1);
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            // Move focus to the previous input field on backspace
            inputRefs.current[index - 1]?.focus();
        }
    };
    const { userData } = useContext(UserContext);
    const onOtpSubmit = () => {
        const enteredOTP = otp.join('').trim();
        if (enteredOTP.length === length) {
            if (enteredOTP.toLocaleUpperCase() === userData.code?.toLocaleUpperCase()) {
                verifyUser.mutate({ email: userData.email ?? '' })

            } else {
                toast.error(`Invalid code. Please try again.`);
            }
        } else {
            toast.warn(`Please enter the 8 digit code you have received on ${userData.email}`);
        }

    }
    return (
        <Container type="verification">
            <div className="flex flex-col w-3/4 py-8 sm:pt-4 -mb-8 text2xl text-center text-black">
                <div className="-mt-2">Enter the 8 digit code you have received on {userData.email}</div>
                <label className="text-left text-black mt-8">Code</label>
                <div className="flex flex-row mt-4 h-full">
                    {otp.map((value, index) => {
                        return (
                            <input
                                key={index}
                                type="text"
                                ref={(input) => { input != null ? inputRefs.current[index] = input : null }}
                                value={value}
                                onChange={(e) => handleChange(index, e)}
                                onClick={() => handleClick(index)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-[22px] h-[22px] radius-lg sm:w-[40px] sm:h-[40px] mr-2 text-center uppercase"
                            />
                        );
                    })}
                </div>
                <button disabled={verifyUser.isPending} onClick={onOtpSubmit} className=" cursor-pointer bg-black hover:bg-gray-700 text-white font-bold py-4 px-4 rounded mt-8 uppercase" type="submit">{verifyUser.isPending ? 'Verifying...' : 'Verify'}</button>

            </div>

        </Container >
    )
}
export default VerificationBox;