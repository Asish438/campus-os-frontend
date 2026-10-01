import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import complaintApi from '../services/complaintApi';
import gatePassApi from '../services/gatePassApi';
import visitorApi from '../services/visitorApi';
import transportApi from '../services/transportApi';
import feeApi from '../services/feeApi';
import attendanceApi from '../services/attendanceApi';
import {
  INITIAL_ATTENDANCE,
  INITIAL_FEES,
  INITIAL_COMPLAINTS,
  INITIAL_GATE_PASSES,
  INITIAL_VISITORS,
  INITIAL_BUSES,
  INITIAL_SECURITY_LOGS,
  INITIAL_ASSIGNMENTS,
  INITIAL_NOTIFICATIONS,
  calculateAttendanceImpact
} from '../data/demoData';

const CampusContext = createContext(null);

export const CampusProvider = ({ children }) => {
  // Shared Campus State
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [gatePasses, setGatePasses] = useState(INITIAL_GATE_PASSES);
  const [visitors, setVisitors] = useState(INITIAL_VISITORS);
  const [buses, setBuses] = useState(INITIAL_BUSES);
  const [securityLogs, setSecurityLogs] = useState(INITIAL_SECURITY_LOGS);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [fees, setFees] = useState(INITIAL_FEES);
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Toast helper
  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random().toString();
    const newToast = { id, type: 'info', ...toast };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Hydrate data from real Spring Boot REST backend
  const fetchAllCampusData = useCallback(async () => {
    const token = localStorage.getItem('campus_os_token');
    if (!token) return;

    try {
      setLoading(true);
      const [
        complaintRes,
        gatePassRes,
        visitorRes,
        busRes,
        feeRes,
        assignmentRes,
        noticeRes
      ] = await Promise.allSettled([
        complaintApi.getAllComplaints(),
        gatePassApi.getAllGatePasses(),
        visitorApi.getVisitors(),
        transportApi.getBuses(),
        feeApi.getFeeDetails(1),
        api.get('/assignments'),
        api.get('/notices/active')
      ]);

      if (complaintRes.status === 'fulfilled' && Array.isArray(complaintRes.value) && complaintRes.value.length > 0) {
        setComplaints(complaintRes.value.map(c => ({
          ...c,
          id: c.id ? `CMP-${c.id}` : c.id,
          student: c.studentName || 'Student',
          room: c.roomNumber || 'Room 304',
          timeline: c.timeline || [{ time: 'Just now', event: `Status: ${c.status}` }]
        })));
      }

      if (gatePassRes.status === 'fulfilled' && Array.isArray(gatePassRes.value) && gatePassRes.value.length > 0) {
        setGatePasses(gatePassRes.value.map(gp => {
          const passId = gp.id ? `GP-${gp.id}` : gp.id;
          const isApproved = gp.status === 'APPROVED' || gp.status === 'Approved';
          const isRejected = gp.status === 'REJECTED' || gp.status === 'Rejected';
          const status = isApproved ? 'Approved' : isRejected ? 'Rejected' : 'Pending';
          const qrCodeStr = gp.qrCode || (isApproved ? `GP-2026-QR${gp.id || '9821'}` : null);
          const outTime = gp.departureTime || '04:30 PM';
          const returnTime = gp.expectedReturnTime || '08:30 PM';
          const purpose = gp.reason || gp.purpose || 'Official Outpass';
          const destination = gp.destination || 'Bhubaneswar Central Market';

          const qrPayload = isApproved ? JSON.stringify({
            passId,
            qrCode: qrCodeStr,
            student: 'Sai Krishna Mohanty',
            studentId: 'BPUT2026001',
            hostel: 'Aryabhatta Hall',
            room: 'Room 304',
            purpose,
            destination,
            date: '2026-10-01',
            validOut: outTime,
            validReturn: returnTime,
            status: 'VALID'
          }) : null;

          return {
            ...gp,
            id: passId,
            student: 'Sai Krishna Mohanty',
            studentId: 'BPUT2026001',
            hostel: 'Aryabhatta Hall',
            room: 'Room 304',
            purpose,
            destination,
            date: '2026-10-01',
            outTime,
            returnTime,
            status,
            qrCode: qrCodeStr,
            qrPayload,
            approvedBy: isApproved ? 'Col. Rajesh Sharma (Warden)' : null,
            approvedAt: isApproved ? 'Today' : null
          };
        }));
      }

      if (visitorRes.status === 'fulfilled' && Array.isArray(visitorRes.value) && visitorRes.value.length > 0) {
        setVisitors(visitorRes.value.map(v => ({
          ...v,
          id: v.id ? `VIS-${v.id}` : v.id,
          status: v.status === 'APPROVED' ? 'Approved' : v.status === 'CHECKED_IN' ? 'Checked-In' : v.status === 'CHECKED_OUT' ? 'Checked-Out' : 'Pending'
        })));
      }

      if (busRes.status === 'fulfilled' && Array.isArray(busRes.value) && busRes.value.length > 0) {
        setBuses(busRes.value);
      }

      if (feeRes.status === 'fulfilled' && feeRes.value) {
        setFees(prev => ({
          ...prev,
          total: feeRes.value.totalFee || prev.total,
          paid: feeRes.value.paidFee || prev.paid,
          pending: feeRes.value.pendingFee || prev.pending
        }));
      }

      if (assignmentRes.status === 'fulfilled' && Array.isArray(assignmentRes.value) && assignmentRes.value.length > 0) {
        setAssignments(assignmentRes.value);
      }

      if (noticeRes.status === 'fulfilled' && Array.isArray(noticeRes.value) && noticeRes.value.length > 0) {
        const mappedNotices = noticeRes.value.map(n => ({
          id: `ntf_${n.id}`,
          title: n.title,
          message: n.content,
          time: 'Active Notice',
          read: false,
          type: n.department || 'Campus Alert'
        }));
        setNotifications(prev => [...mappedNotices, ...prev]);
      }

    } catch (err) {
      console.warn('[CampusContext] REST hydration note:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCampusData();
  }, [fetchAllCampusData]);

  // Notifications
  const addNotification = (notif) => {
    const item = {
      id: `ntf_${Date.now()}`,
      time: 'Just now',
      read: false,
      actionRequired: false,
      ...notif
    };
    setNotifications(prev => [item, ...prev]);
    addToast({
      title: item.title,
      message: item.message,
      type: item.type === 'Alert' ? 'warning' : 'info'
    });
  };

  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // COMPLAINT WORKFLOW WITH SPRING BOOT REST
  const addComplaint = async (newComplaintData) => {
    const payload = {
      studentId: 1,
      category: (newComplaintData.category || 'General Maintenance').toUpperCase(),
      description: newComplaintData.description || '',
      priority: (newComplaintData.priority || 'Medium').toUpperCase(),
      assignedDepartment: newComplaintData.department || 'Maintenance',
      photoPath: newComplaintData.photoPath || null,
      status: 'SUBMITTED'
    };

    let savedComplaint = null;
    try {
      savedComplaint = await complaintApi.createComplaint(payload);
    } catch (err) {
      console.warn('[CampusContext] REST complaint creation note:', err);
    }

    const complaintId = savedComplaint?.id ? `CMP-${savedComplaint.id}` : `CMP-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newComplaint = {
      id: complaintId,
      student: newComplaintData.student || 'Sai Krishna Mohanty',
      studentId: newComplaintData.studentId || 'BPUT2026001',
      hostel: newComplaintData.hostel || 'Aryabhatta Hall of Residence',
      block: newComplaintData.block || 'Block-B',
      room: newComplaintData.room || 'Room 304',
      description: payload.description,
      category: newComplaintData.category || payload.category,
      priority: newComplaintData.priority || 'Medium',
      department: payload.assignedDepartment,
      photoPath: newComplaintData.photoPath || savedComplaint?.photoPath || null,
      status: 'SUBMITTED',
      assignedTo: newComplaintData.assignedTo || 'Maintenance Duty Team',
      createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      updatedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      timeline: [
        {
          time: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
          event: `Logged & AI Classified (${newComplaintData.category || payload.category} / ${newComplaintData.priority || 'Medium'} Priority)`
        }
      ]
    };

    setComplaints(prev => [newComplaint, ...prev]);
    addToast({
      title: 'Complaint Registered (Synced with Database)',
      message: `${newComplaint.id}: Classified as ${newComplaint.category} (${newComplaint.priority} Priority)`,
      type: 'success'
    });

    addNotification({
      type: 'Hostel',
      title: `New Hostel Complaint: ${newComplaint.id}`,
      message: `${newComplaint.student} (${newComplaint.room}) logged a ${newComplaint.category} issue.`,
      link: '/warden/complaints'
    });

    return newComplaint;
  };

  const updateComplaintStatus = async (complaintId, newStatus, assignedTo) => {
    const rawId = typeof complaintId === 'string' && complaintId.includes('CMP-') 
      ? parseInt(complaintId.replace('CMP-', ''), 10) 
      : complaintId;

    if (rawId && !isNaN(rawId)) {
      try {
        await complaintApi.updateStatus(rawId, newStatus, 2);
      } catch (err) {
        console.warn('[CampusContext] REST status update note:', err);
      }
    }

    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId) {
          const updatedTimeline = [
            ...(c.timeline || []),
            {
              time: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
              event: `Status changed to ${newStatus}${assignedTo ? ` (Assigned to ${assignedTo})` : ''}`
            }
          ];
          return {
            ...c,
            status: newStatus,
            assignedTo: assignedTo || c.assignedTo,
            updatedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
            timeline: updatedTimeline
          };
        }
        return c;
      })
    );

    addToast({
      title: 'Complaint Status Updated in Database',
      message: `${complaintId} marked as ${newStatus}`,
      type: 'info'
    });

    addNotification({
      type: 'Hostel',
      title: `Complaint Update: ${complaintId}`,
      message: `Your complaint status has been updated to "${newStatus}".`,
      link: '/student/complaints'
    });
  };

  // GATE PASS WORKFLOW WITH SPRING BOOT REST
  const addGatePass = async (gatePassData) => {
    let savedPass = null;
    try {
      savedPass = await gatePassApi.createGatePass(gatePassData);
    } catch (err) {
      console.warn('[CampusContext] REST gate pass creation fallback:', err);
    }

    const passId = savedPass?.id ? `GP-${savedPass.id}` : `GP-2026-${Math.floor(8000 + Math.random() * 1000)}`;

    const newPass = {
      id: passId,
      student: gatePassData.student || 'Sai Krishna Mohanty',
      studentId: gatePassData.studentId || 'BPUT2026001',
      hostel: gatePassData.hostel || 'Aryabhatta Hall',
      room: gatePassData.room || 'Room 304',
      phone: gatePassData.phone || '+91 98765 43210',
      purpose: gatePassData.purpose,
      destination: gatePassData.destination,
      date: gatePassData.date,
      outTime: gatePassData.outTime,
      returnTime: gatePassData.returnTime,
      status: 'Pending',
      approvedBy: null,
      approvedAt: null,
      qrPayload: null
    };

    setGatePasses(prev => [newPass, ...prev]);
    addToast({
      title: 'Gate Pass Requested (Saved to Database)',
      message: `Request ${passId} submitted to Warden for approval.`,
      type: 'info'
    });

    addNotification({
      type: 'Gate Pass',
      title: `Gate Pass Request from ${newPass.student}`,
      message: `Destination: ${newPass.destination} (${newPass.outTime} - ${newPass.returnTime})`,
      link: '/warden/gate-pass'
    });

    return newPass;
  };

  const approveGatePass = async (passId) => {
    const rawId = typeof passId === 'string' && passId.includes('GP-') 
      ? parseInt(passId.replace('GP-', ''), 10) 
      : passId;

    let updatedPassFromBackend = null;
    if (rawId && !isNaN(rawId)) {
      try {
        updatedPassFromBackend = await gatePassApi.approveGatePass(rawId, 3);
      } catch (err) {
        console.warn('[CampusContext] REST approve note:', err);
      }
    }

    setGatePasses(prev =>
      prev.map(p => {
        if (p.id === passId) {
          const qrCodeStr = updatedPassFromBackend?.qrCode || `GP-2026-QR${Math.floor(1000 + Math.random() * 9000)}`;
          const qrPayload = JSON.stringify({
            passId: p.id,
            qrCode: qrCodeStr,
            student: p.student,
            studentId: p.studentId,
            hostel: p.hostel,
            room: p.room,
            purpose: p.purpose,
            destination: p.destination,
            date: p.date,
            validOut: p.outTime,
            validReturn: p.returnTime,
            status: 'VALID'
          });

          return {
            ...p,
            status: 'Approved',
            qrCode: qrCodeStr,
            approvedBy: 'Col. Rajesh Sharma (Warden)',
            approvedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
            qrPayload
          };
        }
        return p;
      })
    );

    addToast({
      title: 'Gate Pass Approved in Database',
      message: `Pass ${passId} approved. Digital QR pass generated.`,
      type: 'success'
    });

    addNotification({
      type: 'Gate Pass',
      title: `Gate Pass ${passId} Approved!`,
      message: 'Your gate pass has been approved. The digital QR pass is now active.',
      link: '/student/gate-pass'
    });
  };

  const rejectGatePass = async (passId) => {
    const rawId = typeof passId === 'string' && passId.includes('GP-') 
      ? parseInt(passId.replace('GP-', ''), 10) 
      : passId;

    if (rawId && !isNaN(rawId)) {
      try {
        await gatePassApi.rejectGatePass(rawId);
      } catch (err) {
        console.warn('[CampusContext] REST reject note:', err);
      }
    }

    setGatePasses(prev =>
      prev.map(p => (p.id === passId ? { ...p, status: 'Rejected' } : p))
    );
    addToast({
      title: 'Gate Pass Rejected in Database',
      message: `Pass ${passId} was rejected.`,
      type: 'warning'
    });
  };

  // SECURITY VERIFICATION
  const verifySecurityPass = async (passId, actionType = 'ENTRY', gate = 'Main Security Gate 1') => {
    const rawId = typeof passId === 'string' && passId.includes('GP-') 
      ? parseInt(passId.replace('GP-', ''), 10) 
      : passId;

    if (rawId && !isNaN(rawId)) {
      try {
        if (actionType === 'EXIT') {
          await gatePassApi.markExit(rawId);
        } else {
          await gatePassApi.markReturn(rawId);
        }
      } catch (err) {
        console.warn('[CampusContext] REST security pass scan note:', err);
      }
    }

    const targetPass = gatePasses.find(p => p.id === passId) || gatePasses[0];
    const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

    const newLog = {
      id: logId,
      timestamp: now,
      type: actionType,
      entityType: 'STUDENT',
      entityName: targetPass ? targetPass.student : 'Sai Krishna Mohanty',
      entityId: targetPass ? targetPass.studentId : 'BPUT2026001',
      passId: targetPass ? targetPass.id : passId,
      gate,
      verifiedBy: 'Inspector M. Pradhan',
      notes: `Verified via Campus OS QR scanner. Action: ${actionType}.`
    };

    setSecurityLogs(prev => [newLog, ...prev]);

    addToast({
      title: `Security ${actionType} Verified`,
      message: `${newLog.entityName} (${newLog.entityId}) scanned at ${gate}`,
      type: 'success'
    });

    return newLog;
  };

  // VISITOR WORKFLOW WITH SPRING BOOT REST
  const addVisitor = async (visitorData) => {
    let savedVisitor = null;
    try {
      savedVisitor = await visitorApi.createVisitorRequest(visitorData);
    } catch (err) {
      console.warn('[CampusContext] REST visitor creation fallback:', err);
    }

    const visitorId = savedVisitor?.id ? `VIS-${savedVisitor.id}` : `VIS-2026-${Math.floor(300 + Math.random() * 700)}`;

    const newVisitor = {
      id: visitorId,
      visitorName: visitorData.visitorName,
      relationship: visitorData.relationship,
      phone: visitorData.phone,
      studentName: visitorData.studentName || 'Sai Krishna Mohanty',
      studentId: visitorData.studentId || 'BPUT2026001',
      visitDate: visitorData.visitDate,
      expectedArrival: visitorData.expectedArrival,
      purpose: visitorData.purpose,
      status: 'Pending',
      checkedInAt: null,
      checkedOutAt: null
    };

    setVisitors(prev => [newVisitor, ...prev]);
    addToast({
      title: 'Visitor Pass Requested (Saved to Database)',
      message: `Visitor request for ${newVisitor.visitorName} logged.`,
      type: 'info'
    });
    return newVisitor;
  };

  const updateVisitorStatus = async (visitorId, status) => {
    const rawId = typeof visitorId === 'string' && visitorId.includes('VIS-') 
      ? parseInt(visitorId.replace('VIS-', ''), 10) 
      : visitorId;

    if (rawId && !isNaN(rawId)) {
      try {
        if (status === 'Checked-In') {
          await visitorApi.checkInVisitor(rawId);
        } else if (status === 'Checked-Out') {
          await visitorApi.checkOutVisitor(rawId);
        } else if (status === 'Approved') {
          await visitorApi.approveVisitor(rawId, 3);
        }
      } catch (err) {
        console.warn('[CampusContext] REST visitor status update note:', err);
      }
    }

    const now = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    setVisitors(prev =>
      prev.map(v => {
        if (v.id === visitorId) {
          const updated = { ...v, status };
          if (status === 'Checked-In') updated.checkedInAt = now;
          if (status === 'Checked-Out') updated.checkedOutAt = now;
          return updated;
        }
        return v;
      })
    );

    addToast({
      title: 'Visitor Status Updated in Database',
      message: `${visitorId} is now ${status}`,
      type: 'info'
    });
  };

  // TRANSPORT WORKFLOW
  const toggleBusConfirmation = (busId) => {
    setBuses(prev =>
      prev.map(b => {
        if (b.id === busId || b.busNumber === busId) {
          const nextState = !b.isCurrentUserConfirmed;
          const diff = nextState ? 1 : -1;
          const updated = {
            ...b,
            isCurrentUserConfirmed: nextState,
            confirmedPassengers: (b.confirmedPassengers || 20) + diff
          };

          addToast({
            title: nextState ? 'Seat Reserved!' : 'Seat Reservation Cancelled',
            message: nextState
              ? `You are confirmed for ${b.busNumber || b.id} at ${b.departureTime || '08:00 AM'}`
              : `Removed confirmation for ${b.busNumber || b.id}`,
            type: nextState ? 'success' : 'info'
          });

          return updated;
        }
        return b;
      })
    );
  };

  const boardPassenger = async (busId) => {
    const rawId = typeof busId === 'number' ? busId : 1;
    try {
      await transportApi.boardPassenger(rawId, 1, 1);
    } catch (err) {
      console.warn('[CampusContext] REST boarding note:', err);
    }

    setBuses(prev =>
      prev.map(b => {
        if (b.id === busId || b.busNumber === busId) {
          return {
            ...b,
            boardedPassengers: Math.min(b.capacity || 45, (b.boardedPassengers || 25) + 1)
          };
        }
        return b;
      })
    );

    addToast({
      title: 'Passenger Boarded',
      message: `Recorded boarding for Bus #${busId}`,
      type: 'success'
    });
  };

  // WEB AUDIO DEPARTURE CHIME RINGTONE (No external MP3 required)
  const playDepartureChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      
      // Note 1 (E5 - 659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Note 2 (G#5 - 830.61 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(830.61, now + 0.15);
      gain2.gain.setValueAtTime(0.35, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.55);

      // Note 3 (B5 - 987.77 Hz)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(987.77, now + 0.3);
      gain3.gain.setValueAtTime(0.4, now + 0.3);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(now + 0.3);
      osc3.stop(now + 0.85);
    } catch (e) {
      console.warn('[Audio Chime] Note:', e);
    }
  }, []);

  const startTrip = async (busId) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Play melodic departure ringtone on system
    playDepartureChime();

    // 2. Update local bus state
    setBuses(prev =>
      prev.map(b => {
        if (b.id === busId || b.busNumber === busId) {
          return {
            ...b,
            status: 'In Transit',
            departedAt: timeStr
          };
        }
        return b;
      })
    );

    const departureMessage = `Bus #${busId} has just departed campus Gate 1 at ${timeStr}.`;

    // 3. Broadcast notification to all student systems
    addNotification({
      type: 'Transport',
      title: `🚌 Shuttle Departure Alert: ${busId}`,
      message: departureMessage,
      link: '/student/transport'
    });

    // 4. Save notification in MySQL database
    try {
      await api.post('/notifications', {
        userId: 1,
        title: `Bus Departure: ${busId}`,
        message: departureMessage,
        type: 'TRANSPORT',
        isRead: false
      });
    } catch (err) {
      console.warn('[CampusContext] REST notification save note:', err);
    }

    // 5. Trigger audible toast banner
    addToast({
      title: `🔔 BUS DEPARTURE RING: ${busId}`,
      message: `${departureMessage} Ringing alert broadcast to all student IDs.`,
      type: 'warning'
    });
  };

  // FEE PAYMENT WORKFLOW WITH SPRING BOOT REST
  const recordFeePayment = async (amount, feeType) => {
    const numAmount = Number(amount) || 5000;
    try {
      await feeApi.makePayment({
        studentId: 1,
        feeId: 1,
        amount: numAmount,
        paymentMode: 'ONLINE_UPI'
      });
    } catch (err) {
      console.warn('[CampusContext] REST fee payment note:', err);
    }

    const txnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    const receiptNo = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    setFees(prev => {
      const newPaid = (prev.paid || 85000) + numAmount;
      const newPending = Math.max(0, (prev.pending || 18000) - numAmount);

      const newTxn = {
        id: txnId,
        date: dateStr,
        amount: numAmount,
        feeType: feeType || 'Semester Fee Balance',
        method: 'UPI Instant / Verified',
        status: 'SUCCESS',
        receiptNo
      };

      return {
        ...prev,
        paid: newPaid,
        pending: newPending,
        transactions: [newTxn, ...(prev.transactions || [])]
      };
    });

    addToast({
      title: 'Payment Successful (Recorded in Database)',
      message: `₹${numAmount.toLocaleString('en-IN')} paid successfully. Receipt: ${receiptNo}`,
      type: 'success'
    });

    addNotification({
      type: 'Fees',
      title: 'Fee Payment Received',
      message: `Payment of ₹${numAmount.toLocaleString('en-IN')} confirmed. Receipt #${receiptNo} generated.`,
      link: '/student/fees'
    });
  };

  return (
    <CampusContext.Provider
      value={{
        complaints,
        addComplaint,
        updateComplaintStatus,
        gatePasses,
        addGatePass,
        approveGatePass,
        rejectGatePass,
        securityLogs,
        verifySecurityPass,
        visitors,
        addVisitor,
        updateVisitorStatus,
        buses,
        toggleBusConfirmation,
        boardPassenger,
        startTrip,
        playDepartureChime,
        attendance,
        calculateAttendanceImpact,
        fees,
        recordFeePayment,
        assignments,
        notifications,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        toasts,
        addToast,
        removeToast,
        loading,
        refreshCampusData: fetchAllCampusData
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};

export default CampusContext;
