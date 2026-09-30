import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('campus_os_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [gatePasses, setGatePasses] = useState(() => {
    const saved = localStorage.getItem('campus_os_gatepasses');
    return saved ? JSON.parse(saved) : INITIAL_GATE_PASSES;
  });

  const [visitors, setVisitors] = useState(() => {
    const saved = localStorage.getItem('campus_os_visitors');
    return saved ? JSON.parse(saved) : INITIAL_VISITORS;
  });

  const [buses, setBuses] = useState(() => {
    const saved = localStorage.getItem('campus_os_buses');
    return saved ? JSON.parse(saved) : INITIAL_BUSES;
  });

  const [securityLogs, setSecurityLogs] = useState(() => {
    const saved = localStorage.getItem('campus_os_security_logs');
    return saved ? JSON.parse(saved) : INITIAL_SECURITY_LOGS;
  });

  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [fees, setFees] = useState(INITIAL_FEES);
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('campus_os_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState([]);

  // Toast helper
  const addToast = (toast) => {
    const id = Date.now() + Math.random().toString();
    const newToast = { id, type: 'info', ...toast };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('campus_os_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('campus_os_gatepasses', JSON.stringify(gatePasses));
  }, [gatePasses]);

  useEffect(() => {
    localStorage.setItem('campus_os_visitors', JSON.stringify(visitors));
  }, [visitors]);

  useEffect(() => {
    localStorage.setItem('campus_os_buses', JSON.stringify(buses));
  }, [buses]);

  useEffect(() => {
    localStorage.setItem('campus_os_security_logs', JSON.stringify(securityLogs));
  }, [securityLogs]);

  useEffect(() => {
    localStorage.setItem('campus_os_notifications', JSON.stringify(notifications));
  }, [notifications]);

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

  // COMPLAINT WORKFLOW
  const addComplaint = (newComplaintData) => {
    const newComplaint = {
      id: `CMP-2026-${Math.floor(100 + Math.random() * 900)}`,
      student: newComplaintData.student || 'Sai Krishna Mohanty',
      studentId: newComplaintData.studentId || 'BPUT2026001',
      hostel: newComplaintData.hostel || 'Aryabhatta Hall of Residence',
      block: newComplaintData.block || 'Block-B',
      room: newComplaintData.room || 'Room 304',
      description: newComplaintData.description,
      category: newComplaintData.category || 'General Maintenance',
      priority: newComplaintData.priority || 'Medium',
      department: newComplaintData.department || 'Maintenance',
      status: 'SUBMITTED',
      assignedTo: newComplaintData.assignedTo || 'Unassigned (AI Classified)',
      createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      updatedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      timeline: [
        {
          time: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
          event: `Logged & AI Classified (${newComplaintData.category} / ${newComplaintData.priority} Priority)`
        }
      ]
    };

    setComplaints(prev => [newComplaint, ...prev]);
    addToast({
      title: 'Complaint Registered',
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

  const updateComplaintStatus = (complaintId, newStatus, assignedTo) => {
    setComplaints(prev =>
      prev.map(c => {
        if (c.id === complaintId) {
          const updatedTimeline = [
            ...c.timeline,
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
      title: 'Complaint Status Updated',
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

  // GATE PASS WORKFLOW
  const addGatePass = (gatePassData) => {
    const id = `GP-2026-${Math.floor(8000 + Math.random() * 1000)}`;
    const newPass = {
      id,
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
      title: 'Gate Pass Requested',
      message: `Request ${id} submitted to Warden for approval.`,
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

  const approveGatePass = (passId) => {
    let approvedPass = null;
    setGatePasses(prev =>
      prev.map(p => {
        if (p.id === passId) {
          const qrPayload = JSON.stringify({
            passId: p.id,
            student: p.student,
            studentId: p.studentId,
            hostel: p.hostel,
            room: p.room,
            purpose: p.purpose,
            date: p.date,
            validOut: p.outTime,
            validReturn: p.returnTime,
            status: 'VALID'
          });

          approvedPass = {
            ...p,
            status: 'Approved',
            approvedBy: 'Col. Rajesh Sharma (Warden)',
            approvedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
            qrPayload
          };
          return approvedPass;
        }
        return p;
      })
    );

    addToast({
      title: 'Gate Pass Approved',
      message: `Pass ${passId} approved. Digital QR code generated.`,
      type: 'success'
    });

    addNotification({
      type: 'Gate Pass',
      title: `Gate Pass ${passId} Approved!`,
      message: 'Your gate pass has been approved. The digital QR pass is now active.',
      link: '/student/gate-pass'
    });
  };

  const rejectGatePass = (passId) => {
    setGatePasses(prev =>
      prev.map(p => (p.id === passId ? { ...p, status: 'Rejected' } : p))
    );
    addToast({
      title: 'Gate Pass Rejected',
      message: `Pass ${passId} was rejected by warden.`,
      type: 'warning'
    });
  };

  // SECURITY VERIFICATION WORKFLOW
  const verifySecurityPass = (passId, actionType = 'ENTRY', gate = 'Main Security Gate 1') => {
    const targetPass = gatePasses.find(p => p.id === passId) || gatePasses[0];
    const logId = `LOG-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });

    const newLog = {
      id: logId,
      timestamp: now,
      type: actionType, // 'ENTRY' | 'EXIT'
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

    addNotification({
      type: 'Security',
      title: `Campus ${actionType}: ${newLog.entityName}`,
      message: `Recorded at ${gate} at ${now}.`,
      link: '/security/logs'
    });

    return newLog;
  };

  // VISITOR WORKFLOW
  const addVisitor = (visitorData) => {
    const id = `VIS-2026-${Math.floor(300 + Math.random() * 700)}`;
    const newVisitor = {
      id,
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
      title: 'Visitor Pass Requested',
      message: `Visitor request for ${newVisitor.visitorName} logged.`,
      type: 'info'
    });
    return newVisitor;
  };

  const updateVisitorStatus = (visitorId, status) => {
    const now = new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    setVisitors(prev =>
      prev.map(v => {
        if (v.id === visitorId) {
          const updated = { ...v, status };
          if (status === 'Checked-In') {
            updated.checkedInAt = now;
            // Also log to security logs
            setSecurityLogs(sLogs => [
              {
                id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                timestamp: now,
                type: 'ENTRY',
                entityType: 'VISITOR',
                entityName: v.visitorName,
                entityId: v.id,
                passId: v.id,
                gate: 'Main Security Gate 1',
                verifiedBy: 'Inspector M. Pradhan',
                notes: `Visitor checked in to meet ${v.studentName}`
              },
              ...sLogs
            ]);
          }
          if (status === 'Checked-Out') {
            updated.checkedOutAt = now;
            setSecurityLogs(sLogs => [
              {
                id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
                timestamp: now,
                type: 'EXIT',
                entityType: 'VISITOR',
                entityName: v.visitorName,
                entityId: v.id,
                passId: v.id,
                gate: 'Main Security Gate 1',
                verifiedBy: 'Inspector M. Pradhan',
                notes: `Visitor checked out successfully`
              },
              ...sLogs
            ]);
          }
          return updated;
        }
        return v;
      })
    );

    addToast({
      title: 'Visitor Status Updated',
      message: `${visitorId} is now ${status}`,
      type: 'info'
    });
  };

  // TRANSPORT WORKFLOW
  const toggleBusConfirmation = (busId) => {
    setBuses(prev =>
      prev.map(b => {
        if (b.id === busId) {
          const nextState = !b.isCurrentUserConfirmed;
          const diff = nextState ? 1 : -1;
          const updated = {
            ...b,
            isCurrentUserConfirmed: nextState,
            confirmedPassengers: b.confirmedPassengers + diff
          };

          addToast({
            title: nextState ? 'Seat Reserved!' : 'Seat Reservation Cancelled',
            message: nextState
              ? `You are confirmed for ${b.id} (${b.route}) at ${b.departureTime}`
              : `Removed confirmation for ${b.id}`,
            type: nextState ? 'success' : 'info'
          });

          return updated;
        }
        return b;
      })
    );
  };

  const boardPassenger = (busId) => {
    setBuses(prev =>
      prev.map(b => {
        if (b.id === busId) {
          return {
            ...b,
            boardedPassengers: Math.min(b.capacity, b.boardedPassengers + 1)
          };
        }
        return b;
      })
    );
  };

  const startTrip = (busId) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setBuses(prev =>
      prev.map(b => {
        if (b.id === busId) {
          return {
            ...b,
            status: 'In Transit',
            departedAt: timeStr
          };
        }
        return b;
      })
    );

    const departureMessage = `${busId} has departed campus at ${timeStr}.`;

    addNotification({
      type: 'Transport',
      title: `Bus Departure: ${busId}`,
      message: departureMessage,
      link: '/student/transport'
    });

    addToast({
      title: 'Trip Started',
      message: departureMessage,
      type: 'success'
    });
  };

  // FEE PAYMENT
  const recordFeePayment = (amount, feeType) => {
    const txnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    const receiptNo = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    setFees(prev => {
      const newPaid = prev.paid + Number(amount);
      const newPending = Math.max(0, prev.pending - Number(amount));

      const updatedBreakdown = prev.breakdown.map(item => {
        if (item.type.toLowerCase().includes(feeType.toLowerCase())) {
          const itemPending = Math.max(0, item.pending - Number(amount));
          const itemPaid = item.total - itemPending;
          return {
            ...item,
            paid: itemPaid,
            pending: itemPending,
            status: itemPending === 0 ? 'PAID' : 'PARTIAL'
          };
        }
        return item;
      });

      const newTxn = {
        id: txnId,
        date: dateStr,
        amount: Number(amount),
        feeType: feeType || 'Semester Fee Balance',
        method: 'UPI Instant / Verified',
        status: 'SUCCESS',
        receiptNo
      };

      return {
        ...prev,
        paid: newPaid,
        pending: newPending,
        breakdown: updatedBreakdown,
        transactions: [newTxn, ...prev.transactions]
      };
    });

    addToast({
      title: 'Payment Successful',
      message: `₹${Number(amount).toLocaleString('en-IN')} paid successfully. Receipt: ${receiptNo}`,
      type: 'success'
    });

    addNotification({
      type: 'Fees',
      title: 'Fee Payment Received',
      message: `Payment of ₹${Number(amount).toLocaleString('en-IN')} confirmed. Receipt #${receiptNo} generated.`,
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
        removeToast
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
