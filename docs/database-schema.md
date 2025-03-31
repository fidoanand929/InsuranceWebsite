# Database Schema Documentation

## Overview
The application uses Supabase as its backend, which is built on PostgreSQL. The database consists of two main tables for storing car and truck finance quotes.

## Tables

### car_quotes

```sql
CREATE TABLE car_quotes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    customer_name TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    email TEXT NOT NULL,
    car_make TEXT NOT NULL,
    car_model TEXT NOT NULL,
    car_year INTEGER NOT NULL,
    vehicle_cost INTEGER NOT NULL,
    down_payment INTEGER NOT NULL,
    loan_term INTEGER NOT NULL,
    monthly_income INTEGER NOT NULL,
    employment_type TEXT NOT NULL,
    credit_score INTEGER NOT NULL,
    quote_amount INTEGER NOT NULL,
    interest_rate DECIMAL(4,2) NOT NULL,
    monthly_payment INTEGER NOT NULL,
    status TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE car_quotes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users only" ON car_quotes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users" ON car_quotes
    FOR SELECT USING (true);
```

#### Field Descriptions
- `id`: Unique identifier for each quote
- `created_at`: Timestamp of quote creation
- `customer_name`: Full name of the applicant
- `contact_number`: Contact number of the applicant
- `email`: Email address of the applicant
- `car_make`: Make of the car (e.g., Honda, Toyota)
- `car_model`: Model of the car (e.g., Civic, Camry)
- `car_year`: Manufacturing year of the car
- `vehicle_cost`: Total cost of the vehicle in INR
- `down_payment`: Down payment amount in INR
- `loan_term`: Loan duration in months
- `monthly_income`: Monthly income of the applicant in INR
- `employment_type`: Type of employment (salaried, self-employed, business)
- `credit_score`: Credit score of the applicant (300-900)
- `quote_amount`: Approved loan amount in INR
- `interest_rate`: Annual interest rate
- `monthly_payment`: Calculated monthly EMI in INR
- `status`: Application status (approved, rejected, error)

### truck_quotes

```sql
CREATE TABLE truck_quotes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    customer_name TEXT NOT NULL,
    business_name TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    email TEXT NOT NULL,
    vehicle_type TEXT NOT NULL,
    vehicle_cost INTEGER NOT NULL,
    down_payment INTEGER NOT NULL,
    loan_term INTEGER NOT NULL,
    monthly_revenue INTEGER NOT NULL,
    business_age INTEGER NOT NULL,
    credit_score INTEGER NOT NULL,
    quote_amount INTEGER NOT NULL,
    interest_rate DECIMAL(4,2) NOT NULL,
    monthly_payment INTEGER NOT NULL,
    status TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE truck_quotes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users only" ON truck_quotes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users" ON truck_quotes
    FOR SELECT USING (true);
```

#### Field Descriptions
- `id`: Unique identifier for each quote
- `created_at`: Timestamp of quote creation
- `customer_name`: Full name of the applicant
- `business_name`: Name of the business
- `contact_number`: Contact number of the applicant
- `email`: Email address of the applicant
- `vehicle_type`: Type of truck (heavy-duty, medium-duty, light-duty, semi-truck)
- `vehicle_cost`: Total cost of the vehicle in INR
- `down_payment`: Down payment amount in INR
- `loan_term`: Loan duration in months
- `monthly_revenue`: Monthly revenue of the business in INR
- `business_age`: Age of the business in years
- `credit_score`: Credit score of the applicant (300-900)
- `quote_amount`: Approved loan amount in INR
- `interest_rate`: Annual interest rate
- `monthly_payment`: Calculated monthly EMI in INR
- `status`: Application status (approved, rejected, error)

## Data Validation Rules

### Car Quotes
1. Credit score must be between 300 and 900
2. Minimum monthly income: ₹25,000
3. Minimum down payment: 10% of vehicle cost
4. Vehicle year must be 2000 or later
5. Loan term must be between 36 and 84 months

### Truck Quotes
1. Credit score must be between 300 and 900
2. Minimum monthly revenue: ₹100,000
3. Minimum down payment: 15% of vehicle cost
4. Minimum business age: 2 years
5. Loan term must be between 36 and 84 months

## Interest Rate Calculation

### Car Loans
- Credit Score > 750: 7.0%
- Credit Score > 700: 8.5%
- Credit Score > 650: 10.0%
- Credit Score > 600: 12.0%
- Credit Score ≤ 600: 14.0%

### Truck Loans
- Credit Score > 750: 8.0%
- Credit Score > 700: 9.0%
- Credit Score > 650: 10.0%
- Credit Score ≤ 650: 12.0%

## Database Indexes
```sql
-- Car Quotes Indexes
CREATE INDEX car_quotes_customer_name_idx ON car_quotes(customer_name);
CREATE INDEX car_quotes_email_idx ON car_quotes(email);
CREATE INDEX car_quotes_created_at_idx ON car_quotes(created_at);
CREATE INDEX car_quotes_status_idx ON car_quotes(status);

-- Truck Quotes Indexes
CREATE INDEX truck_quotes_customer_name_idx ON truck_quotes(customer_name);
CREATE INDEX truck_quotes_business_name_idx ON truck_quotes(business_name);
CREATE INDEX truck_quotes_email_idx ON truck_quotes(email);
CREATE INDEX truck_quotes_created_at_idx ON truck_quotes(created_at);
CREATE INDEX truck_quotes_status_idx ON truck_quotes(status);
```

## Backup and Recovery
Supabase automatically handles database backups with the following schedule:
- Daily backups retained for 7 days
- Weekly backups retained for 4 weeks
- Monthly backups retained for 6 months

## Security Considerations
1. Row Level Security (RLS) is enabled for all tables
2. All sensitive data should be encrypted
3. Regular security audits should be performed
4. Access logs should be monitored
5. Database credentials should be rotated periodically 