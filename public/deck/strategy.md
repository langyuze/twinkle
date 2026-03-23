# The Wallet is Every Brand's Next Storefront
### A Strategy for the Credential Commerce Platform

---

## The $18B Problem No One Has Solved

Every e-commerce merchant faces the same existential question: *how do I reach my customer after they leave my site?*

Today, the answer is email — and it's failing. 85% of marketing emails land in spam or go unread. SMS is being blocked by carriers. Push notifications require an app install that 50% of users delete within 30 days. Merchants spend an average of **$29 to re-acquire a customer they already have.**

The result: a $18 billion re-engagement industry (Klaviyo, Braze, Iterable, Mailchimp) built entirely on a broken channel. These companies don't solve the problem — they optimize a dying medium. They are the last generation of fax machine manufacturers.

Meanwhile, there is one app on every smartphone that users never delete, check multiple times daily, and trust implicitly: **their digital wallet.**

## The Thesis

**The wallet is the next great commerce channel.** Not email. Not an app. The wallet.

We believe that within five years, every meaningful e-commerce interaction — identity verification, payment, loyalty membership, promotional offers, and purchase receipts — will flow through a single surface: the customer's digital wallet. The merchant-customer relationship will be mediated not by email lists and ad retargeting, but by **verifiable credentials** — cryptographically signed, user-controlled, portable digital artifacts that live in Google Wallet and Apple Wallet.

This is not speculation. The infrastructure is being built right now:

- **Google and Apple** are adding OpenID4VCI credential support to their wallet platforms
- **The EU's eIDAS 2.0 regulation** mandates every member state provide a Digital Identity Wallet by end of 2026 — creating 450 million wallet users overnight
- **NIST** just published mobile identity guidelines (SP 1800-42A) with 29 industry partners
- **The OpenID Foundation** launched self-certification for Verifiable Credentials, with major enterprises already signing up

The rails are being laid. What's missing is the merchant-side tooling — the layer that makes it trivially easy for any online store to issue credentials to their customers' wallets. **That's what we're building.**

## The Product: Credential Commerce Platform

We provide merchants a simple integration — a Shopify plugin, a Stripe-like API, or a single JavaScript snippet — that enables three credential flows out of the box:

**1. Verifiable Loyalty Passes**
Customer joins a membership program → a cryptographically signed loyalty credential lands in their Google/Apple Wallet. No app download. No plastic card. No account to remember. The pass is portable, verifiable, and always accessible. The merchant now has a direct, opt-in channel to the customer's most trusted app.

**2. Smart Promotional Offers**
Customer abandons a cart → the merchant pushes a personalized promotional credential directly to their wallet. Not an email they'll never open. A rich, signed offer with the actual cart items, live countdown timer, unique promo code, and one-tap checkout link. The customer sees it in their wallet alongside their credit cards and boarding passes. Open rates: **near 100%** (it's in their wallet — they see it every time they pay for anything).

**3. Verifiable Receipts**
Customer completes a purchase → a signed receipt credential is automatically delivered to their wallet. Itemized, timestamped, cryptographically verifiable. No email to search for. Works instantly for returns, warranty claims, expense reports, and tax documentation. This is the wedge — zero behavior change for the customer, immediate utility, and once the receipt is in the wallet, the channel is permanently open.

Every credential is issued via **OpenID4VCI** (an open W3C/IETF standard) as a **Selective Disclosure JWT** — compact, privacy-preserving, and verifiable offline. No blockchain. No proprietary protocol. Just battle-tested cryptography on open standards.

## The Wedge: Receipts First

Our go-to-market is receipts. Why:

- **Zero behavior change** — customers already get receipts. We just make them better.
- **Immediate utility** — returns, warranties, expenses, taxes. Day-one value.
- **Regulatory tailwind** — EU digital receipt mandates are coming. Early movers win.
- **Channel opener** — once the receipt is in the wallet, the merchant has a direct line for loyalty and promos. The receipt is the Trojan horse.

We start with DTC brands doing $5–50M revenue on Shopify. They're spending $50–200K/year on Klaviyo with declining open rates. They're desperate for a new channel. We give them one that lives in the one app their customers trust most.

## The Economics: Marketing Budget → Customer Discount

Here's the math that changes everything: merchants currently spend **$29 on average to re-acquire an existing customer** through email campaigns, retargeting ads, and SMS blasts. Most of that spend goes to platforms — Google Ads, Meta, Klaviyo — not to the customer.

With wallet credentials, that $29 marketing budget becomes a **$29 discount sent directly to the customer's wallet**. No ad platform takes a cut. No email service charges per send. No retargeting pixel needed. The merchant's marketing spend is converted dollar-for-dollar into customer value.

This creates a virtuous cycle:
- **Merchant** saves on marketing infrastructure costs and gets higher conversion rates (wallet open rates ~100% vs. email ~15%)
- **Customer** gets a real discount instead of being stalked across the internet by retargeting ads
- **Platform middlemen** (ad networks, email services, SMS providers) get disintermediated

The wallet credential isn't just a better channel — it's a **fundamentally more efficient allocation of marketing dollars**. Every dollar that used to go to Klaviyo or Meta Ads now goes directly to the customer as a price reduction. The merchant's margin improves because conversion rates are higher. The customer's experience improves because they get a real offer, not spam. Both sides win. The losers are the middlemen.

## The Moat

**Network effects.** Every merchant that issues credentials grows the wallet ecosystem. Every customer who accepts credentials expects them from other merchants. The more credentials in a wallet, the more the wallet becomes the default surface for commerce. This is a platform play with compounding network effects.

**Standard ownership.** We contribute to and build on OpenID4VCI — the open standard that Google, Apple, and the EU have chosen. We're not building proprietary lock-in. We're building the best tooling for the standard the world is adopting. The standard is the moat, because switching to a competitor still means using the same protocol we helped shape.

**Data position.** We see every credential issuance — what merchants issue, what customers accept, what offers convert. This is the most valuable signal in commerce: the real-time graph of merchant-customer relationships, expressed as verifiable credentials. No email marketing platform has this.

## Market Timing

The window is now. Google Wallet has 150M+ monthly active users. Apple Wallet is on every iPhone. The EU is mandating digital wallets for 450M citizens. The standards are ratified. The infrastructure is ready.

But no one has built the merchant-side tooling. The credential issuance layer — the "Stripe for wallet credentials" — does not exist. Every merchant that wants to issue a loyalty pass to Google Wallet today has to navigate a complex API, manage signing keys, and implement the OID4VCI protocol from scratch.

**We make it one line of code.**

We are building the platform layer between merchants and wallets — the same position Stripe occupied between merchants and payment networks. Stripe didn't invent credit cards. We're not inventing wallets. We're making them useful for commerce.

## The 5-Year Vision

**Year 1:** Verifiable receipts for Shopify DTC brands. Prove the channel. Show open rates that make Klaviyo look like direct mail.

**Year 2:** Add loyalty passes and promotional offers. Merchants manage their entire wallet credential strategy from one dashboard.

**Year 3:** Wallet becomes the primary post-purchase channel. Merchants shift budget from email marketing to wallet credentials. First enterprise contracts.

**Year 4:** Credential verification and presentation (OpenID4VP). Customers present wallet credentials for age verification, loyalty tier validation, and proof-of-purchase — replacing paper and PDF.

**Year 5:** The wallet is the CRM. Identity, payments, loyalty, promotions, and receipts — all in one place, all verifiable, all user-controlled. Email marketing is a legacy channel. The merchant-customer relationship is direct, trusted, and permanent.

---

*We have a working end-to-end prototype. The demo is live. The standards are ready. The wallets are waiting. The only question is who builds the merchant layer — and we're already here.*

---
