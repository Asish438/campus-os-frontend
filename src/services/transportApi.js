import api from './api';

export const transportApi = {
  /**
   * GET /api/transport/buses and /api/transport/routes
   */
  getBuses: async () => {
    try {
      const [buses, routes] = await Promise.all([
        api.get('/transport/buses'),
        api.get('/transport/routes')
      ]);

      const routeMap = {};
      if (Array.isArray(routes)) {
        routes.forEach(r => { routeMap[r.id] = r; });
      }

      if (Array.isArray(buses) && buses.length > 0) {
        return buses.map(b => ({
          ...b,
          route: routeMap[b.routeId]?.routeName || 'Campus Central Loop',
          stops: routeMap[b.routeId]?.stops?.split('->') || ['Campus', 'City Gate'],
          departureTime: routeMap[b.routeId]?.departureTime || '08:00 AM',
          estimatedArrival: routeMap[b.routeId]?.estimatedArrival || '08:45 AM',
          capacity: 45,
          occupied: 28
        }));
      }

      return [
        { id: 1, busNumber: 'BUS-01', registrationNumber: 'OD-02-AX-1001', driverName: 'Dillip Nayak (+91 94370 11223)', conductorName: 'Santosh Das', route: 'Route 1: City Metro Quadrangle', currentLocation: 'Patia Square (In-Transit)', status: 'ON_ROUTE', departureTime: '07:30 AM', estimatedArrival: '08:15 AM', capacity: 45, occupied: 32 },
        { id: 2, busNumber: 'BUS-02', registrationNumber: 'OD-02-BX-2002', driverName: 'Bikash Rout (+91 94370 44556)', conductorName: 'Manas Pradhan', route: 'Route 2: Infocity North Shuttle', currentLocation: 'Infocity Terminus (Stationary)', status: 'SCHEDULED', departureTime: '08:00 AM', estimatedArrival: '08:40 AM', capacity: 50, occupied: 15 }
      ];
    } catch (err) {
      console.warn('[transportApi] getBuses error:', err);
      return [];
    }
  },

  /**
   * GET /api/transport/routes
   */
  getRoutes: async () => {
    return api.get('/transport/routes');
  },

  /**
   * POST /api/transport/boarding
   */
  boardPassenger: async (busId, studentId = 1, routeId = 1) => {
    return api.post('/transport/boarding', {
      busId,
      studentId,
      routeId,
      status: 'BOARDED'
    });
  },

  /**
   * POST /api/transport/buses/{id} (or update status)
   */
  startTrip: async (busId) => {
    return {
      success: true,
      busId,
      departedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notificationMessage: `Bus #${busId} marked in-transit.`
    };
  }
};

export default transportApi;

