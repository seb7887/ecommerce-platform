# Sells

## Sell logic

The backend sell logic perform the following steps when a new sell order is requested.

- **Validate stock**: checks if there is a valid quantity of products for the requested order. If not, the operation is cancelled.
- **Create order**: creates the requested order in the system and return the order id.
- **Create sell**: the requested sell order is created with the information provided.
- **Update stock**

Bulk creation will do this steps N-times.
