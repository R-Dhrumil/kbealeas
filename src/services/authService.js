const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5153/api/Auth';

/**
 * Parses HTTP error response from ASP.NET Core backend.
 */
async function handleResponseError(response) {
  let errorMessage = 'An unexpected error occurred. Please try again.';
  try {
    const data = await response.json();
    if (data.message) {
      errorMessage = data.message;
    } else if (data.errors) {
      // Handle ASP.NET Core ModelState validation errors object
      const errorList = Object.values(data.errors).flat();
      if (errorList.length > 0) {
        errorMessage = errorList.join(' ');
      }
    } else if (typeof data === 'string') {
      errorMessage = data;
    }
  } catch (e) {
    errorMessage = `Server Error (${response.status}: ${response.statusText})`;
  }
  throw new Error(errorMessage);
}

export const authService = {
  /**
   * Register a new user account
   */
  async register(registerData) {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: registerData.fullName,
        email: registerData.email,
        phone: registerData.phone || null,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword
      }),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return await response.json(); // returns AuthResponseDto: { token, user, message }
  },

  /**
   * Authenticate user with Email or Phone and Password
   */
  async login(loginData) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailOrPhone: loginData.emailOrPhone,
        password: loginData.password,
      }),
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return await response.json(); // returns AuthResponseDto: { token, user, message }
  },

  /**
   * Retrieve current user details using JWT Bearer token
   */
  async getCurrentUser(token) {
    const response = await fetch(`${API_BASE_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      await handleResponseError(response);
    }

    return await response.json(); // returns UserDto: { id, fullName, email, phone, role, createdAt }
  }
};
