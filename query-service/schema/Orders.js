cube(`Orders`, {
  sql: `SELECT * FROM public.orders`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, customername, paid, createdAt, updatedAt, date]
    }
  },
  
  dimensions: {
    customeremail: {
      sql: `${CUBE}."customerEmail"`,
      type: `string`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    customername: {
      sql: `${CUBE}."customerName"`,
      type: `string`
    },
    
    paid: {
      sql: `paid`,
      type: `string`
    },
    
    shippingmethod: {
      sql: `${CUBE}."shippingMethod"`,
      type: `string`
    },
    
    detail: {
      sql: `detail`,
      type: `string`
    },
    
    delivered: {
      sql: `delivered`,
      type: `string`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    
    updatedAt: {
      sql: `updated_at`,
      type: `time`
    },
    
    date: {
      sql: `date`,
      type: `time`
    },
    
    publishedAt: {
      sql: `published_at`,
      type: `time`
    }
  }
});
