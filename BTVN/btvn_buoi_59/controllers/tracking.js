import prisma from "../prisma/prisma.js"

const trackingPixel = Buffer.from("R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", "base64")

export async function GET(req, res) {
  try {
    const emailId = req.query.id
    await prisma.sent.update({
      where: {
        id: emailId,
      },
      data: {
        seen_at: new Date(),
      },
    })

    res.set("X-Tracking-Success", "true")
  } catch (error) {
    res.set("X-Tracking-Success", "false")
  }

  res.set("Content-Type", "image/gif")
  res.send(trackingPixel)
}
