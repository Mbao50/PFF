/*
  # Create Products Table with CRUD Operations

  ## Overview
  Creates a complete products management system with full CRUD capabilities.

  ## New Tables
  1. `products`
    - `id` (uuid, primary key) - Unique identifier for each product
    - `name` (text, required) - Product name
    - `description` (text, optional) - Product description
    - `price` (numeric, required) - Product price with 2 decimal places
    - `stock` (integer, required) - Available stock quantity
    - `category` (text, optional) - Product category
    - `created_at` (timestamptz) - Record creation timestamp
    - `updated_at` (timestamptz) - Record last update timestamp

  ## Security
  - Enable Row Level Security (RLS) on products table
  - Add policy for public read access (SELECT)
  - Add policy for public insert access (INSERT)
  - Add policy for public update access (UPDATE)
  - Add policy for public delete access (DELETE)

  ## Notes
  - This is a demo CRUD application with public access for simplicity
  - In production, replace public policies with authenticated user policies
  - Price uses numeric type for precise decimal calculations
  - Timestamps automatically track creation and updates
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(10, 2) NOT NULL DEFAULT 0,
  stock integer NOT NULL DEFAULT 0,
  category text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for full CRUD access (public for demo purposes)
CREATE POLICY "Allow public read access"
  ON products FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert access"
  ON products FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON products FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON products FOR DELETE
  TO anon
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();