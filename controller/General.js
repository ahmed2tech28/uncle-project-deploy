import { generalResponse } from "../helper/SendMail.js";
import catchAsyncErrors from "../utils/catchAsyncErrors.js";

// Show Single Contact
export const sendingMail = catchAsyncErrors(async (req, res, next) => {
    const { email, message } = req.body
    await generalResponse({ email, message })
    return res.status(200).json({ success: true, message: "Send Successfully" })

});
