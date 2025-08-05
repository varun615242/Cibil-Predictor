const cron = require('node-cron');
const { sendEmail } = require('./emailserver');
const CIBILDetails = require('./models/CIBILDetails');
const User = require('./models/User'); // Assuming User model has email info

// Function to check due dates and send emails
const checkDueDates = async () => {
  try {
    const cibilRecords = await CIBILDetails.find();
    const currentDate = new Date();

    for (const record of cibilRecords) {
      const { pancard, Loans = [] } = record;

      // Fetch user email using PAN card
      const user = await User.findOne({ pancard: pancard });
      if (!user || !user.email) continue;

      for (const loan of Loans) {
        if (!loan.due_date) continue;
        const dueDate = new Date(loan.due_date);
        const daysRemaining = (dueDate - currentDate) / (1000 * 3600 * 24);

        // Reminder: 2 days before
        if (daysRemaining <= 2 && daysRemaining > 1) {
          await sendEmail(
            user.email, // Send to the user's email
            '📌 Reminder: Loan EMI Due in 2 Days',
            `Hi ${user.username}, your EMI for ${loan.Loan_Company} is due in 2 days. Kindly pay on time to avoid penalties.`
          );
        }

        // Reminder: On due date
        if (daysRemaining <= 0 && daysRemaining > -1) {
          await sendEmail(
            user.email, // Send to the user's email
            '📅 EMI Due Today',
            `Hi ${user.username}, today is the due date for your EMI with ${loan.Loan_Company}. Please make the payment today.`
          );
        }
      }
    }
  } catch (error) {
    console.error("Error checking due dates:", error);
  }
};

// Schedule to run every day at midnight
cron.schedule('* * * * *', checkDueDates); // ⏰ Daily at 00:00

module.exports = { checkDueDates };
