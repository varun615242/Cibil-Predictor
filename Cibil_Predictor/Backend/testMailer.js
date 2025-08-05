const { sendEmail } = require('./emailserver');

const testEmail = async () => {
  try {
    await sendEmail(
      'shivaprasad20005@gmail.com', // Replace with your own email
      '✅ Test Email from Loan Scheduler',
      '🎉 Hello! This is a test email sent manually using Node.js.'
    );
  } catch (error) {
    console.error("Test email failed:", error);
  }
};

testEmail();
