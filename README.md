# E-commerce Website

## Overview

This project is a full-featured e-commerce website developed using React for the frontend and Django for the backend. The website allows users to browse, purchase products, manage their accounts, and much more.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#Technologies-Used)
3. [Installation](#installation)
4. [Running the Project](#running-the-project)
5. [Key Components](#key-components)
6. [API Integration](#api-integration)
7. [Authentication](#authentication)
8. [CSRF Protection](#csrf-protection)
9. [Deployment](#deployment)


## Features

- **Product Browsing:** Users can browse products by categories, view detailed product information, and filter products.
- **User Authentication:** Secure user registration, login, and logout with JWT-based authentication.
- **Shopping Cart:** Users can add products to the cart and proceed to checkout.
- **Order Management:** Users can view their past orders and buy again.
- **Payment Integration:** Integrated with Stripe for secure payments.
- **Product Recommendations:** Related products and deals are shown to enhance user experience.
- **Address Management:** Users can manage their shipping addresses.
- **Responsive Design:** The site is responsive and works well on various screen sizes.
- **Admin Panel:** Manage products, orders, and users via Django Admin.

## Technologies Used

- **Frontend:** React, TailwindCSS, Axios
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL, managed via AWS RDS
- **Server:** Nginx, running on Ubuntu EC2 instance
- **Storage:** AWS S3
- **Authentication:** JWT (JSON Web Tokens)
- **Payment Integration:** Stripe
- **CI/CD:** GitHub Actions
- **Deployment:** AWS (EC2, S3, RDS, IAM)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or Yarn
- Python 3.8+
- Django 4.0+
- PostgreSQL (or another database supported by Django)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/QuantomErik/E-commerce.git
   cd E-commerce/backend

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt

3. Set up the database:
   ```bash
   python manage.py makemigrations
   python manage.py migrate

4. Create a superuser for the admin panel:
   ```bash
   python manage.py createsuperuser
   
5. Run the Django development server:
   ```bash
   python manage.py runserver

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
2. Install JavaScript dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm run dev

## Key Components

### ProductCard
`ProductCard` is a reusable component that displays individual product details, including price, description, and add-to-cart functionality.

### ProductDetail
`ProductDetail` is used to show detailed information about a single product, including related products and product parameters.

### CartDrawer
`CartDrawer` is a component that allows users to view and manage items in their cart.

### AuthProvider
`AuthProvider` is a context provider that manages user authentication across the application.

### ProtectedRoute
`ProtectedRoute` is a higher-order component that ensures only authenticated users can access certain routes.

## API Integration

The frontend communicates with the backend via a set of RESTful APIs. The API calls are handled using `axios`, with a custom instance to manage authentication tokens and CSRF protection.

### Example API Call

```javascript
import api from '../../api';

const fetchProducts = async () => {
  try {
    const response = await api.get('/api/products/');
    setProducts(response.data);
  } catch (err) {
    console.error('Failed to fetch products', err);
  }
};
```


## Authentication

Authentication is handled via JWT tokens. The backend provides token generation and refreshing endpoints. The frontend stores tokens in `localStorage` and manages user sessions using `AuthContext`.

### Token Refresh

If the access token expires, the frontend will automatically request a new token using the refresh token.

## CSRF Protection

The frontend uses CSRF tokens to protect against CSRF attacks. The CSRF token is fetched and stored in cookies, and it is automatically included in relevant requests.

## Deployment

### Backend

The backend of this application is deployed on AWS using an EC2 instance running Ubuntu with Nginx as the web server. The database is powered by PostgreSQL, managed through AWS RDS (Relational Database Service). For file storage, AWS S3 is utilized, and AWS IAM (Identity and Access Management) is used for securely managing access to AWS resources. The PostgreSQL interface is managed using Admin4.

### Frontend

The frontend of this application is also deployed on the same AWS EC2 instance using Nginx to serve the static files. This setup ensures that both the backend and frontend are hosted on the same server, providing a streamlined and efficient deployment. 

## Contact
### For any inquiries or support, please contact:

#### Name: Erik Yang
#### Email: erikyang@hotmail.com

   
