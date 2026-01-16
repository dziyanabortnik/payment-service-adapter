# Payment Adapter & Decorator Pattern LabShapes Application

## Project Description

Implementation of Adapter and Decorator patterns for integrating a third-party payment service with logging, error handling, and validation features.

## Requirements
- Node.js ≥ 14
- TypeScript ≥ 5.0

## Quick Start

```bash
npm install
npm run build

npm start

# For development:
npm run dev
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Project Structure

src/payment/
├── interfaces/     # Core interfaces
├── adapters/       # Adapter implementation
├── decorators/     # Decorator implementations
├── external/       # Third-party service mock
└── main.ts         # Demo application

## Patterns Implemented

### Adapter Pattern
- PaymentServiceAdapter adapts ThirdPartyPaymentService to IPaymentProcessor
- Enables compatibility between different interfaces

### Decorator Pattern
- ValidationDecorator - validates payment data
- ErrorHandlerDecorator - retries failed payments
- PaymentLoggerDecorator - logs all operations
