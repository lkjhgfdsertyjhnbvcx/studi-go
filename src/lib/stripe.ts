import Stripe from 'stripe';

// 🌟 最新のAPIバージョンに合わせつつ、型エラーを回避するために as any を使用します
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_test_key', {
  apiVersion: '2026-02-25.clover' as any,
  appInfo: {
    name: 'Studi-Go',
    version: '0.1.0',
  },
});
