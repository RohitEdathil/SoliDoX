export function success(message: string): {
  success: boolean;
  message: string;
} {
  return {
    success: true,
    message,
  };
}
