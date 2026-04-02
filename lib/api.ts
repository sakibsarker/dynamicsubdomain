import { WebsiteResponse, BusinessLogoResponse } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// ─── Server-side fetchers (used in server components / layout) ───

export async function getWebsiteByUrl(
  subdomain: string,
): Promise<WebsiteResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/webpages/${subdomain}/page/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getBusinessLogo(
  userId: number,
): Promise<BusinessLogoResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/users/business-logo/${userId}/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Client-side API helpers (used in popup form components) ───

export async function getServicesByUserId(userId: number) {
  const res = await fetch(`${API_BASE_URL}/services/user/${userId}/list/`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

export async function getAppointmentOptionsByUserId(userId: number) {
  const res = await fetch(
    `${API_BASE_URL}/services/options/user/${userId}/list/`,
  );
  if (!res.ok) throw new Error("Failed to fetch appointment options");
  return res.json();
}

export async function getBusinessHoursByUserId(userId: number) {
  const res = await fetch(
    `${API_BASE_URL}/users/business-hours/user/${userId}/list`,
  );
  if (!res.ok) throw new Error("Failed to fetch business hours");
  return res.json();
}

export async function checkCustomerByPhone(
  createdById: number,
  phoneNumber: string,
) {
  const res = await fetch(`${API_BASE_URL}/customer/check/${createdById}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone_number: phoneNumber }),
  });
  if (!res.ok) throw new Error("Customer not found");
  return res.json();
}

export async function createCustomerByCreatedId(
  createdById: number,
  data: {
    contact_first_name: string;
    contact_last_name: string;
    phone_number: string;
    email_address: string;
  },
) {
  const res = await fetch(`${API_BASE_URL}/customer/${createdById}/create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create customer");
  return res.json();
}

export async function updateCustomerVehicles(
  customerId: number,
  data: {
    vehicle: Array<{
      make: string;
      year: string;
      model: string;
      license_plate?: string;
    }>;
    customer_vehicle?: Array<{
      name: string;
      license_plate?: string;
    }>;
  },
) {
  const res = await fetch(
    `${API_BASE_URL}/customer/${customerId}/update-vehicles/`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!res.ok) throw new Error("Failed to update vehicles");
  return res.json();
}

export async function validateAppointmentSlot(
  createdId: number,
  data: {
    myservices: Array<{ service_id: number }>;
    appointment_date: string;
    appointment_time: string;
  },
) {
  const res = await fetch(
    `${API_BASE_URL}/appointment/${createdId}/rate-limit-create/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    throw errData || new Error("Slot validation failed");
  }
  return res.json();
}

export async function createPublicAppointment(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/appointment/public/create/`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create appointment");
  return res.json();
}

export async function createPublicEstimate(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/estimate/public/create/`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create estimate");
  return res.json();
}
