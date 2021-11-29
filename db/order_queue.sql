SELECT id, customer_id, order_timestamp, progress
FROM orders
WHERE progress NOT LIKE 'Completed'
ORDER BY order_timestamp
