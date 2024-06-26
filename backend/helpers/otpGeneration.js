// Global OTP storage using a Map
const otpStorage = new Map();

const generateOTP = (mobileNumber, digitCount, expirationTimeInSeconds) => {
  if (typeof digitCount !== 'number' || digitCount <= 0) {
    throw new Error('Invalid digit count. Please provide a positive integer.');
  }

  const min = 10 ** (digitCount - 1);
  const max = 10 ** digitCount - 1;

  const otp = Math.floor(min + Math.random() * (max - min + 1)).toString();

  const timestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = timestamp + expirationTimeInSeconds;

  // Store OTP information in the global otpStorage
  otpStorage.set(mobileNumber, { otp, expirationTimestamp });

  // Return OTP along with the expiration timestamp
  return { otp, expirationTimestamp };
};

const verifyOTP = (mobileNumber, userEnteredOTP) => {
  const storedData = otpStorage.get(mobileNumber);

  if (!storedData || !storedData.otp || !storedData.expirationTimestamp) {
    return { success: false, message: 'Invalid OTP or OTP expired' };
  }

  const { otp, expirationTimestamp } = storedData;

  if (userEnteredOTP !== otp) {
    return { success: false, message: 'Invalid OTP' };
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (currentTimestamp > expirationTimestamp) {
    // Clear the expired OTP from storage
    otpStorage.delete(mobileNumber);
    return { success: false, message: 'OTP has expired' };
  }

  otpStorage.delete(mobileNumber); // Clear the OTP from storage (OTP can only be used once)

  return { success: true, message: 'OTP verification successful' };
};
module.exports ={generateOTP,verifyOTP};