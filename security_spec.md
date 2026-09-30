# Security Specification: Tambula Uganda Safari CMS & Database

## 1. Data Invariants
1. **Destinations**: Every destination document must have a valid ID string (`^[a-zA-Z0-9_\-]+$`), title, country, description, and priceFromUSD >= 0. No oversized descriptions (> 50KB).
2. **Group Departures**: Group departure must have positive maxGroupSize, non-negative seatsBooked <= maxGroupSize, and positive priceUSD.
3. **Team Members**: Team member must have valid ID, name, role, guiding specialty, bio, and image (valid URL or formatted image data URL within size limit).
4. **Trip Memories (Uploads)**: Uploaded memories must have title, destination, valid image payload, and travelersCount >= 1.
5. **Bookings**: A customer booking must include a valid bookingRef, tripId, fullName, email, and totalAmountUSD > 0.
6. **Integrity & Role Enforcement**: Public users can read active destinations, group departures, team members, and trip memories. Public users can create bookings and upload trip memories. CMS administrative modifications (creating/updating/deleting destinations, group departures, and team members) are restricted to authorized admins or validated CMS sessions.

## 2. The "Dirty Dozen" Malicious Payloads
1. **Payload 1 (ID Poisoning Attack)**: Attempting to write a destination with a 50KB malicious path/ID containing script tags or traversal characters (`../../admin`).
2. **Payload 2 (Ghost Field Injection)**: Injecting unauthorized privilege fields like `isAdmin: true` or `role: 'superadmin'` into a destination or team member document.
3. **Payload 3 (Negative Price Manipulation)**: Setting `priceUSD: -500` or `priceFromUSD: -1000` to manipulate safari booking economics.
4. **Payload 4 (Oversized Denial-of-Wallet Payload)**: Submitting a team member bio or trip memory coverImage exceeding volumetric bounds (> 2MB string).
5. **Payload 5 (Unbounded Array Injection)**: Submitting an array of 5,000 tags/languages into `languages` or `certifications` to exhaust client and database memory.
6. **Payload 6 (Corrupted Booking Reference)**: Submitting a booking with missing mandatory traveler details (`email` missing, negative `totalAmountUSD`).
7. **Payload 7 (Orphaned Group Departure)**: Submitting a departure with `seatsBooked: 99` when `maxGroupSize: 10`.
8. **Payload 8 (Invalid Type Infiltration)**: Supplying a numeric `name` or boolean `image` in `TeamMember`.
9. **Payload 9 (Unauthorized Delete)**: Attempting to delete a destination or team member without verified administrative credentials.
10. **Payload 10 (Script Injection in Title)**: Injecting raw `<script>alert(1)</script>` into `title` or `bio`.
11. **Payload 11 (Status Hijacking)**: Forcing an illegal state transition to an unapproved departure status.
12. **Payload 12 (Empty Required Fields)**: Writing a destination with whitespace-only title or missing required country identifier.

## 3. Test Runner Specification
The test suite `firestore.rules.test.ts` validates that all 12 dirty payloads fail validation and are rejected with `PERMISSION_DENIED`.
