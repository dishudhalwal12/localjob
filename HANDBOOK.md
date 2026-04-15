# LocalJob Handbook

## 1. The One-Liner
**LocalJob** is a **hyperlocal worker directory** that helps households and skilled workers finally stop losing time, money, and jobs to middlemen and random phone-number hunts.

## 2. The Problem (Why This Exists)
- **Finding a nearby worker fast is messy** - people still depend on calls, neighbors, and luck.
- **Skilled workers stay invisible online** - many know the work, but have no simple digital presence.
- **Platform cuts hurt workers** - commission-based apps take money out of already tight earnings.
- **City-level search feels useless** - people want someone from their **colony or locality**, not across town.

## 3. What We Built
**LocalJob** is a web app where anyone can search for nearby electricians, plumbers, painters, carpenters, mechanics, tailors, and AC technicians by **area** and **skill**. Customers browse without logging in, open a worker profile, and contact that person directly by phone or WhatsApp 📞.

What makes this different from a generic student project is that the full **user flow** actually works: browse, filter, open a profile, contact a worker, create a listing, edit it, switch availability, and track views from a dashboard.

- **Area Search** - find workers by colony or locality instead of only by city.
- **Skill Filters** - jump straight to the trade you need in one tap.
- **Public Profiles** - show skill, experience, bio, location, and live availability.
- **Direct Contact** - call or WhatsApp a worker without any booking fee.
- **Self-Listing Form** - workers add their own details and publish a profile.
- **Worker Dashboard** - edit the listing, toggle status, track views, or delete it.

## 4. Who Uses It
| **Role** | **What they can do** | **What their screen looks like** |
| --- | --- | --- |
| **Customer** | Search by area, filter by skill, open profiles, and contact workers directly. | A clean **Find Workers** page with search, filter chips, worker cards, and profile pages. |
| **New Worker** | Create an account and publish a listing with contact and service details. | A **List Yourself** page with a login/register panel and a guided worker form. |
| **Listed Worker** | Update profile details, switch availability, watch profile views, or remove the listing. | A **Dashboard** with stat cards, status toggle, edit form, and profile preview link. |

## 5. Tech Stack — The Engine Room ⚙️
| **Layer** | **Tools** |
| --- | --- |
| **Frontend** | **Next.js 14**, **React 18**, **TypeScript**, **Tailwind CSS**, `react-hot-toast` |
| **Backend / Database** | **Firebase** setup and **Firestore rules** are in place; the current demo stores data in **localStorage** |
| **AI / Smart Features** | **Debounced search**, **skill filtering**, and **view tracking**; no fake AI pasted on top |
| **Deployment** | **Vercel-friendly** Next.js structure, with a browser-based **demo mode** right now |

We picked tools that let us move fast, keep the UI sharp, and still leave a clear path from a demo build to a real **production backend** later.

## 6. How It Actually Works
1. You open **LocalJob** → land on the homepage → see the pitch and jump straight to search or listing.
2. You tap **Find a Worker** → type your area or locality → narrow results with skill filters.
3. You open a **worker profile** → check experience, bio, location, and current availability.
4. You hit **Call Now** or **WhatsApp** → talk to the worker directly → handle the job without a middle layer.
5. If you are a worker, you open **List Yourself** → create an account → fill in your skill, area, phone, and experience.
6. You return to the **dashboard** → edit the listing, switch status, preview the public page, and watch profile views grow.

## 7. The Team
**Divyarth** → owned the end-to-end **product build** → turned a blank Next.js starter into the landing page, search flow, worker profiles, and dashboard.

**UI/UX teammate** → owned the **visual direction** → shaped the bold type, color system, and mobile-friendly screens that make the app feel finished.

**Product/data teammate** → owned the **listing logic** → worked through the worker fields, validation rules, and dashboard actions that make the flow usable.

All three of us **pulled the product together**, tested the user journey, and turned a loose idea into a demo people can actually click through.

## 8. What's Not Done Yet (Honest Corner)
- **No real backend yet** - listings and accounts still live in browser storage in demo mode 🧪.
- **No trust layer yet** - there is no worker verification, rating system, or moderation flow.
- **No in-app booking yet** - users still call or message manually and finish the deal offline.

## 9. If We Had More Time...
- **Connect real Firebase Auth and Firestore** - make listings persist across devices and sessions.
- **Add trust features** - verify workers, collect reviews, and flag bad listings early.
- **Make it more local-first** - add Hindi or regional language support, maps, and smarter area matching.

## 10. The Bottom Line
**LocalJob** proves that a simple idea gets powerful when the **user journey** is clear: find a worker nearby, contact them fast, and let workers manage their own visibility. We built more than a landing page here; we built a working flow with search, profiles, forms, validation, status control, and direct contact. We also learned that honesty matters as much as polish, which is why this handbook says clearly where the product is real and where it is still a demo. We did not just make something that looks good on a projector; we built something that already feels one step away from real neighborhood use, and that is the part worth being proud of.
