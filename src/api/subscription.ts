
import api from "./axios";

interface SubscriptionResponse {
  success: boolean;
  message: string;
}

export const subscribeToNewsletter = async (
  email: string
): Promise<SubscriptionResponse> => {
  const response = await api.post<SubscriptionResponse>(
    "/subscriptions",
    { email }
  );

  return response.data;
};
