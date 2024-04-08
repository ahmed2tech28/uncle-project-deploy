import nodemailer from "nodemailer";

const sendMail = async (user) => {
  try {
    let mymail = "ahmedalirana28@gmail.com";
    let password = "blvh ieow mqal exxx";
    let { email, verificationCode } = user;

    // Create Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mymail,
        pass: password,
      },
      port: 587, // This is the correct port number for the Gmail SMTP server
    });

    // Define email options
    let mailOptions = {
      from: mymail,
      to: email,
      subject: "Your Verification Code from Orbiologics",
      html: `<h1 style="text-align:center;">Your Verification Code</h1><br><br><h1 style="text-align:center;color:red;">${verificationCode}</h1>`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    // Return a promise so that the caller can handle the success or failure of the email delivery
    return Promise.resolve(info);
  } catch (error) {
    console.error("Error sending email:", error);

    // Log the error message to a file or database, so that you can track and troubleshoot any issues that arise
    // ...

    // Return a promise so that the caller can handle the failure of the email delivery
    return Promise.reject(error);
  }
};

// Example usage
sendMail({ email: "ahmedalirana38@gmail.com", verificationCode: "2323" })
  .then((info) => {
    console.log("Message sent successfully:", info.messageId);
  })
  .catch((error) => {
    console.error("Error sending email:", error);
  });



// const tag = ['a', 'b', 'c', 'd']

// const product = [{ id: 1, tags: ['a'] }, { id: 2, tags: ['a', 'b'] }, { id: 3, tags: ['a', 'd'] }, { id: 4, tags: ['a', 'd', 'c'] },]
