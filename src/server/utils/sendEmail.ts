import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "hussainbadri786@gmail.com",
        pass: "imre bstc iyca eplq",
    },
});



export const sendMail = async (receiver: string, code: string) => {
    const info = await transporter.sendMail({
        from: '"Hussain Calcuttawala" <hussainbadri786@gmail.com>',
        to: receiver,
        subject: "Verification code for Ecomm",
        html: `<b>Your verification code is ${code.toUpperCase()}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
};


