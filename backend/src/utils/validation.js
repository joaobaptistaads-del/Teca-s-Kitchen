import { body, param, query } from 'express-validator';

export const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

export const productValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').optional(),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category_id').isUUID().withMessage('Valid category ID is required'),
  body('image_url').optional().isURL().withMessage('Image URL must be valid'),
  body('is_active').optional().isBoolean()
];

export const saleValidation = [
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.product_id').isUUID().withMessage('Valid product ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('payment_method').notEmpty().withMessage('Payment method is required')
];

export const expenseValidation = [
  body('description').notEmpty().withMessage('Description is required'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('date').isISO8601().withMessage('Valid date is required')
];

export const settingsValidation = [
  body('key').notEmpty().withMessage('Settings key is required'),
  body('value').notEmpty().withMessage('Settings value is required')
];

export const uuidValidation = [
  param('id').isUUID().withMessage('Valid UUID is required')
];
