import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});



export const sendMail = async (receiver: string, code: string) => {
    const info = await transporter.sendMail({
        from: `"Hussain Calcuttawala" <${process.env.SMTP_USERNAME}>`,
        to: receiver,
        subject: "Verification code for Ecomm",
        html: `<b>Your verification code is ${code.toUpperCase()}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
};


