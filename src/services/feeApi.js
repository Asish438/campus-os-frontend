import api, { IS_DEMO_MODE } from './api';
import { INITIAL_FEES } from '../data/demoData';

export const feeApi = {
  getFeeDetails: async () => {
    if (IS_DEMO_MODE) {
      return INITIAL_FEES;
    }
    return api.get('/fees/summary');
  },

  makePayment: async (paymentData) => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 600));
      const receiptNo = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const txnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      return {
        success: true,
        transactionId: txnId,
        receiptNo,
        amount: paymentData.amount,
        feeType: paymentData.feeType,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
    }
    return api.post('/fees/pay', paymentData);
  }
};

export default feeApi;
