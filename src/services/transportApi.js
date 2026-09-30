import api, { IS_DEMO_MODE } from './api';
import { INITIAL_BUSES } from '../data/demoData';

export const transportApi = {
  getBuses: async () => {
    if (IS_DEMO_MODE) {
      return INITIAL_BUSES;
    }
    return api.get('/transport/buses');
  },

  toggleConfirmation: async (busId, studentId) => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 200));
      return { success: true, busId, studentId };
    }
    return api.post(`/transport/buses/${busId}/confirm`, { studentId });
  },

  startTrip: async (busId) => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 300));
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return {
        success: true,
        busId,
        departedAt: timeStr,
        notificationMessage: `${busId} has departed campus at ${timeStr}.`
      };
    }
    return api.post(`/transport/buses/${busId}/start-trip`);
  },

  boardPassenger: async (busId) => {
    if (IS_DEMO_MODE) {
      return { success: true, busId };
    }
    return api.post(`/transport/buses/${busId}/board`);
  }
};

export default transportApi;
