import { toast } from '@zerodevx/svelte-toast';
export const showToast = (message: string, type?: 'success' | 'error' | 'warning' | 'info') =>
  toast.push(message, {
    theme: {
      '--toastColor': 'mintcream',
      '--toastBackground': 'rgba(72,187,120,0.9)',
      '--toastBarBackground': '#2F855A'
    }
  });
