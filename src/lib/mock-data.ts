export const mockLeads = [
  { id: 'lead1', name: 'John Doe', phone: '123-456-7890', platform: 'whatsapp', status: 'new', createdAt: '2024-05-20T10:00:00Z' },
  { id: 'lead2', name: 'Jane Smith', phone: '234-567-8901', platform: 'messenger', status: 'contacted', createdAt: '2024-05-19T14:30:00Z' },
  { id: 'lead3', name: 'Mike Johnson', phone: '345-678-9012', platform: 'whatsapp', status: 'converted', createdAt: '2024-05-18T11:20:00Z' },
  { id: 'lead4', name: 'Emily Brown', phone: '456-789-0123', platform: 'messenger', status: 'new', createdAt: '2024-05-20T12:00:00Z' },
  { id: 'lead5', name: 'Chris Lee', phone: '567-890-1234', platform: 'whatsapp', status: 'new', createdAt: '2024-05-21T09:00:00Z' },
];

export const mockOrders = [
  { id: 'order1', customerName: 'Mike Johnson', products: ['PestAway Max', 'RodentBait 5000'], totalAmount: 75.99, orderDate: '2024-05-18T12:00:00Z', status: 'Delivered' },
  { id: 'order2', customerName: 'Sarah Wilson', products: ['AntGuard Pro'], totalAmount: 29.99, orderDate: '2024-05-19T09:15:00Z', status: 'Shipped' },
  { id: 'order3', customerName: 'David Chen', products: ['RoachKill Gel', 'SpiderSpray'], totalAmount: 45.50, orderDate: '2024-05-20T11:45:00Z', status: 'Confirmed' },
  { id: 'order4', customerName: 'Lisa Garcia', products: ['PestAway Max'], totalAmount: 49.99, orderDate: '2024-05-20T13:00:00Z', status: 'Pending' },
  { id: 'order5', customerName: 'James Taylor', products: ['Mosquito Zapper'], totalAmount: 99.99, orderDate: '2024-05-21T10:30:00Z', status: 'Pending' },
];

export const mockRecentActivity = [
  { type: 'lead', data: mockLeads[4] },
  { type: 'order', data: mockOrders[4] },
  { type: 'lead', data: mockLeads[3] },
  { type: 'order', data: mockOrders[3] },
  { type: 'lead', data: mockLeads[0] },
];

export const mockLeadChartData = [
  { month: 'Jan', New: 20, Contacted: 15, Converted: 10 },
  { month: 'Feb', New: 25, Contacted: 20, Converted: 12 },
  { month: 'Mar', New: 30, Contacted: 22, Converted: 18 },
  { month: 'Apr', New: 28, Contacted: 25, Converted: 20 },
  { month: 'May', New: 35, Contacted: 28, Converted: 22 },
  { month: 'Jun', New: 40, Contacted: 35, Converted: 28 },
];
