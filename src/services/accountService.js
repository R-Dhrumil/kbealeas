const API_URL = import.meta.env.VITE_API_BASE_URL 
  ? import.meta.env.VITE_API_BASE_URL.replace(/\/Auth$/, '/Account')
  : 'http://localhost:5153/api/Account';

async function handleResponseError(response) {
  let errorMessage = 'An unexpected error occurred. Please try again.';
  try {
    const data = await response.json();
    if (data.message) {
      errorMessage = data.message;
    } else if (data.errors) {
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

function getAuthHeaders(token) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

export const accountService = {
  // Profile
  async getProfile(token) {
    const res = await fetch(`${API_URL}/profile`, {
      headers: getAuthHeaders(token)
    });
    if (!res.ok) await handleResponseError(res);
    return await res.json();
  },

  async updateProfile(token, profileData) {
    const res = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(profileData)
    });
    if (!res.ok) await handleResponseError(res);
    return await res.json();
  },

  // Addresses
  async getAddresses(token) {
    const res = await fetch(`${API_URL}/addresses`, {
      headers: getAuthHeaders(token)
    });
    if (!res.ok) await handleResponseError(res);
    return await res.json();
  },

  async createAddress(token, addressData) {
    const res = await fetch(`${API_URL}/addresses`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(addressData)
    });
    if (!res.ok) await handleResponseError(res);
    return await res.json();
  },

  async updateAddress(token, id, addressData) {
    const res = await fetch(`${API_URL}/addresses/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(addressData)
    });
    if (!res.ok) await handleResponseError(res);
    return await res.json();
  },

  async deleteAddress(token, id) {
    const res = await fetch(`${API_URL}/addresses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    });
    if (!res.ok) await handleResponseError(res);
    return await res.json();
  },

  async setDefaultShipping(token, id) {
    const res = await fetch(`${API_URL}/addresses/${id}/set-default-shipping`, {
      method: 'PATCH',
      headers: getAuthHeaders(token)
    });
    if (!res.ok) await handleResponseError(res);
    return await res.json();
  },

  async setDefaultBilling(token, id) {
    const res = await fetch(`${API_URL}/addresses/${id}/set-default-billing`, {
      method: 'PATCH',
      headers: getAuthHeaders(token)
    });
    if (!res.ok) await handleResponseError(res);
    return await res.json();
  },

  // Payment Methods
  async getPaymentMethods(token) {
    const res = await fetch(`${API_URL}/payment-methods`, {
      headers: getAuthHeaders(token)
    });
    if (!res.ok) await handleResponseError(res);
    return await res.json();
  },

  async createPaymentMethod(token, data) {
    const res = await fetch(`${API_URL}/payment-methods`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(data)
    });
    if (!res.ok) await handleResponseError(res);
    return await res.json();
  },

  async deletePaymentMethod(token, id) {
    const res = await fetch(`${API_URL}/payment-methods/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    });
    if (!res.ok) await handleResponseError(res);
    return await res.json();
  }
};
