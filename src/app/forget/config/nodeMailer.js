import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST (request){
   try {
    const {subject,message}=await request.json()
    const transporter=nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "nlhd.2701@gmail.com",
        pass: "mcfc reqm gaci tbmd",
      },
    })
    const mailOption={
        from :'nlhd.2701@gmail.com',
        to:'huynhduynguyenle@gmail.com',
        subject:"mã khôi phục pass",
        html:`
        <h3>Mã OTP</h3>
        <li>tilte:${subject}</li>
        <li>message:${message}</li>

        `
    }
    await transporter.sendMail(mailOption)
    return NextResponse.json({message:"email send sucsec"})
   } catch (error) {
      return NextResponse.json({message:"email send error"},{status:500})
   }
}

