import { Resend } from "resend";
import { Analytics } from "@vercel/analytics/next"

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    const { name, email, message } = req.body;

    try {
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: "edwink226@gmail.com",
            subject: `Portfolio Message from ${name}`,
            replyTo: email,
            text: `
Name: ${name}

Email: ${email}

Message:
${message}
            `
        });

        res.status(200).json({
            success: true
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false
        });
    }
}