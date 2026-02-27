import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('STRIPE_SECRET_KEY is missing, using a dummy test key for UI review.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_test_key', {
    apiVersion: '2026-01-28.clover',
    appInfo: {
        name: 'Studi-Go',
        version: '0.1.0'
    }
})
