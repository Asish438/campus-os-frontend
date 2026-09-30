import api, { IS_DEMO_MODE } from './api';
import { INITIAL_COMPLAINTS } from '../data/demoData';

export const complaintApi = {
  getMyComplaints: async () => {
    if (IS_DEMO_MODE) {
      return INITIAL_COMPLAINTS;
    }
    return api.get('/complaints/my');
  },

  getAllComplaints: async () => {
    if (IS_DEMO_MODE) {
      return INITIAL_COMPLAINTS;
    }
    return api.get('/complaints/all');
  },

  createComplaint: async (complaintData) => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 400));
      const newComplaint = {
        id: `CMP-2026-${Math.floor(100 + Math.random() * 900)}`,
        student: complaintData.student || 'Sai Krishna Mohanty',
        studentId: complaintData.studentId || 'BPUT2026001',
        hostel: complaintData.hostel || 'Aryabhatta Hall of Residence',
        block: complaintData.block || 'Block-B',
        room: complaintData.room || 'Room 304',
        description: complaintData.description,
        category: complaintData.category || 'General Maintenance',
        priority: complaintData.priority || 'Medium',
        department: complaintData.department || 'Maintenance',
        status: 'SUBMITTED',
        assignedTo: complaintData.assignedTo || 'Unassigned (AI Queued)',
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
        timeline: [
          { time: new Date().toLocaleString(), event: `Complaint logged with AI auto-classification (${complaintData.category} / ${complaintData.priority})` }
        ]
      };
      return newComplaint;
    }
    return api.post('/complaints', complaintData);
  },

  updateStatus: async (complaintId, newStatus, assignedTo) => {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 300));
      return { complaintId, newStatus, assignedTo, updatedAt: new Date().toLocaleString() };
    }
    return api.patch(`/complaints/${complaintId}/status`, { status: newStatus, assignedTo });
  }
};

export default complaintApi;
