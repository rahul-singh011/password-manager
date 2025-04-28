// This is a mock authentication service
// In a real application, you would use a proper authentication library

// Mock function to authenticate a user
export async function authenticateUser(email: string, password: string) {
  // This would be an actual API call to your authentication service
  return new Promise<{ success: boolean; requiresMfa: boolean }>((resolve) => {
    setTimeout(() => {
      // For demo purposes, any login with @example.com will "succeed"
      const isValidEmail = email.endsWith("@example.com")
      const isValidPassword = password.length >= 8

      if (isValidEmail && isValidPassword) {
        // For demo purposes, we'll say this user has MFA enabled
        resolve({ success: true, requiresMfa: true })
      } else {
        resolve({ success: false, requiresMfa: false })
      }
    }, 1000)
  })
}

// Mock function to create a new user
export async function createUser(name: string, email: string, password: string) {
  // This would be an actual API call to your authentication service
  return new Promise<{ success: boolean; userId: string }>((resolve) => {
    setTimeout(() => {
      // For demo purposes, any valid input will "succeed"
      resolve({
        success: true,
        userId: "user_" + Math.random().toString(36).substring(2, 11),
      })
    }, 1000)
  })
}

// Mock function to check if a password has been leaked
export async function checkPasswordLeak(password: string) {
  // This would use an actual API like HaveIBeenPwned
  return new Promise<{ leaked: boolean; count?: number }>((resolve) => {
    setTimeout(() => {
      // For demo purposes, we'll consider passwords with "password" in them as leaked
      const isLeaked = password.toLowerCase().includes("password")
      resolve({
        leaked: isLeaked,
        count: isLeaked ? Math.floor(Math.random() * 1000) + 1 : 0,
      })
    }, 500)
  })
}

// Mock function to analyze password strength
export function analyzePasswordStrength(password: string) {
  // This would use a more sophisticated algorithm in a real app
  let score = 0

  // Length check
  if (password.length >= 12) {
    score += 2
  } else if (password.length >= 8) {
    score += 1
  }

  // Character variety checks
  if (/[A-Z]/.test(password)) score += 1 // Uppercase
  if (/[a-z]/.test(password)) score += 1 // Lowercase
  if (/[0-9]/.test(password)) score += 1 // Numbers
  if (/[^A-Za-z0-9]/.test(password)) score += 1 // Special characters

  // Determine strength category
  if (score >= 5) return "strong"
  if (score >= 3) return "medium"
  return "weak"
}
