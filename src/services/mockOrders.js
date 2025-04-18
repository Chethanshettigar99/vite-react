// src/services/mockOrders.js

const mockOrders = [
  {
    id: 'ORD1001', customerName: 'Alice Smith', date: '2023-10-26', status: 'Delivered', amount: 150.00,
    items: [
        { id: 'P001', name: 'Wireless Mouse', quantity: 1, price: 25.00 },
        { id: 'P002', name: 'Keyboard', quantity: 1, price: 75.00 },
        { id: 'P003', name: 'Monitor Stand', quantity: 1, price: 50.00 }
    ],
    shippingAddress: '123 Main St, Anytown, USA 12345',
    customerEmail: 'alice.s@example.com'
  },
  {
    id: 'ORD1002', customerName: 'Bob Johnson', date: '2023-11-15', status: 'Shipped', amount: 75.50,
    items: [ { id: 'P004', name: 'USB Cable', quantity: 2, price: 12.75 }, { id: 'P005', name: 'Webcam', quantity: 1, price: 50.00 } ],
    shippingAddress: '456 Oak Ave, Somewhere, USA 67890',
    customerEmail: 'b.johnson@sample.net'
   },
  {
    id: 'ORD1003', customerName: 'Charlie Brown', date: '2024-01-05', status: 'Processing', amount: 210.25,
    items: [ { id: 'P006', name: 'Laptop Sleeve', quantity: 1, price: 35.00 }, { id: 'P007', name: 'Docking Station', quantity: 1, price: 175.25 } ],
    shippingAddress: '789 Pine Ln, Villagetown, USA 10112',
    customerEmail: 'charlie@comics.org'
  },
  {
    id: 'ORD1004', customerName: 'Diana Prince', date: '2023-12-20', status: 'Delivered', amount: 55.00,
    items: [{ id: 'P008', name: 'Mouse Pad', quantity: 1, price: 15.00 }, { id: 'P009', name: 'Screen Cleaner', quantity: 1, price: 40.00 }],
    shippingAddress: 'Paradise Island, DC Universe', customerEmail: 'diana@themyscira.gov'
  },
  {
    id: 'ORD1005', customerName: 'Ethan Hunt', date: '2024-02-10', status: 'Processing', amount: 300.75,
    items: [{ id: 'P010', name: 'Secure SSD', quantity: 1, price: 300.75 }],
    shippingAddress: 'IMF Headquarters, Langley, VA', customerEmail: 'ethan.h@imf.agency'
  },
  {
    id: 'ORD1006', customerName: 'Fiona Glenanne', date: '2024-03-01', status: 'Cancelled', amount: 99.99,
    items: [{ id: 'P011', name: 'Exploding Pen', quantity: 3, price: 33.33 }],
    shippingAddress: 'Unknown - Burn Notice', customerEmail: 'fiona@private.spy'
  },
  {
    id: 'ORD1007', customerName: 'George Costanza', date: '2024-03-15', status: 'Shipped', amount: 125.00,
    items: [{ id: 'P012', name: 'Imported Calendar', quantity: 1, price: 125.00 }],
    shippingAddress: 'Vandelay Industries, NYC', customerEmail: 'art@vandelay.com'
  },
  {
    id: 'ORD1008', customerName: 'Hannah Abbott', date: '2024-04-01', status: 'Processing', amount: 88.20,
    items: [{ id: 'P013', name: 'Advanced Potion Making', quantity: 1, price: 88.20 }],
    shippingAddress: 'The Leaky Cauldron, London', customerEmail: 'hannah.a@hogwarts.wiz'
  },
  {
    id: 'ORD1009', customerName: 'Isaac Newton', date: '2024-04-10', status: 'Delivered', amount: 450.00,
    items: [{ id: 'P014', name: 'Reflecting Telescope Kit', quantity: 1, price: 450.00 }],
    shippingAddress: 'Trinity College, Cambridge', customerEmail: 'isaac.newton@cam.ac.uk'
  },
  {
    id: 'ORD1010', customerName: 'Jane Doe', date: '2024-04-15', status: 'Shipped', amount: 65.30,
    items: [{ id: 'P015', name: 'Generic Item A', quantity: 1, price: 30.00 }, { id: 'P016', name: 'Generic Item B', quantity: 1, price: 35.30 }],
    shippingAddress: '1 Any Street, Anytown', customerEmail: 'jane.d@anonymous.com'
  },
  {
    id: 'ORD1011', customerName: 'Kyle Broflovski', date: '2024-04-18', status: 'Processing', amount: 199.50,
    items: [{ id: 'P017', name: 'Gaming PC Component', quantity: 1, price: 199.50 }],
    shippingAddress: 'South Park, Colorado', customerEmail: 'kyle@southpark.cc'
  },
    {
    id: 'ORD1012', customerName: 'Luna Lovegood', date: '2024-04-19', status: 'Processing', amount: 25.50,
    items: [{ id: 'P019', name: 'Spectrespecs', quantity: 1, price: 25.50 }],
    shippingAddress: 'The Rookery, Ottery St Catchpole', customerEmail: 'luna.l@quibbler.wiz'
  },
  {
    id: 'ORD1013', customerName: 'Michael Scott', date: '2024-04-20', status: 'Delivered', amount: 15.00,
    items: [{ id: 'P020', name: 'Worlds Best Boss Mug', quantity: 1, price: 15.00 }],
    shippingAddress: 'Dunder Mifflin, Scranton, PA', customerEmail: 'michael.scott@dundermifflin.com'
  },
   {
    id: 'ORD1014', customerName: 'Neville Longbottom', date: '2024-04-21', status: 'Shipped', amount: 45.00,
    items: [{ id: 'P021', name: 'Mimbulus Mimbletonia', quantity: 1, price: 45.00 }],
    shippingAddress: 'Herbology Greenhouses, Hogwarts', customerEmail: 'neville.l@hogwarts.wiz'
  },
   {
    id: 'ORD1015', customerName: 'Oscar Martinez', date: '2024-04-22', status: 'Processing', amount: 180.00,
    items: [{ id: 'P022', name: 'Accounting Software License', quantity: 1, price: 180.00 }],
    shippingAddress: 'Dunder Mifflin, Scranton, PA', customerEmail: 'oscar.m@dundermifflin.com'
  },
  {
    id: 'ORD1025', customerName: 'Peter Pan', date: '2023-09-01', status: 'Delivered', amount: 42.00,
    items: [{ id: 'P018', name: 'Fairy Dust (Sample)', quantity: 1, price: 42.00 }],
    shippingAddress: 'Second Star to the Right, Neverland', customerEmail: 'peter@neverland.fly'
  },
];

export default mockOrders;