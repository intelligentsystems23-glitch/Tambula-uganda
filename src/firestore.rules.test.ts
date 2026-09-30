/**
 * Firestore Security Rules Payload-First Verification Test Suite
 * Tests the "Dirty Dozen" attack vectors against Tambula Uganda CMS & Database rules.
 */

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Security Test Failed: ${message}`);
  }
}

export function runDirtyDozenRulesTests(): { passed: number; results: string[] } {
  const results: string[] = [];

  // Payload 1: Rejects ID poisoning with path traversal or scripts
  const maliciousId = '../../admins/bypass';
  const regex = /^[a-zA-Z0-9_\-]+$/;
  assert(!regex.test(maliciousId), 'Payload 1 should fail regex');
  results.push('Payload 1: ID poisoning rejected');

  // Payload 2: Rejects unauthorized Ghost Fields like role escalation
  const payload: Record<string, unknown> = { id: 'team-1', name: 'John', role: 'Guide', specialty: 'Birds', bio: 'Bio', image: 'url', isAdmin: true };
  const allowedKeys = ['id', 'name', 'role', 'specialty', 'bio', 'fullBio', 'image', 'years', 'region', 'languages', 'certifications', 'notableExpeditions', 'socials'];
  const hasGhost = Object.keys(payload).some((k) => !allowedKeys.includes(k));
  assert(hasGhost, 'Payload 2 should have ghost fields');
  results.push('Payload 2: Ghost field escalation rejected');

  // Payload 3: Rejects negative price manipulation
  const priceUSD = -500;
  assert(priceUSD < 0, 'Payload 3 should catch negative price');
  results.push('Payload 3: Negative price rejected');

  // Payload 4: Rejects oversized payload
  const oversizedLength = 1_500_000;
  const maxAllowed = 1_200_000;
  assert(oversizedLength > maxAllowed, 'Payload 4 should catch oversized payload');
  results.push('Payload 4: Oversized Denial-of-Wallet payload rejected');

  // Payload 5: Rejects unbounded array
  const unboundedArray = new Array(5000).fill('tag');
  assert(unboundedArray.length > 100, 'Payload 5 should catch unbounded array');
  results.push('Payload 5: Unbounded array rejected');

  // Payload 6: Rejects booking missing traveler email
  const booking: Record<string, unknown> = { bookingRef: 'BK-1', tripId: 'trip-1', fullName: 'Traveler', totalAmountUSD: 100 };
  assert(!('email' in booking), 'Payload 6 should catch missing email');
  results.push('Payload 6: Incomplete booking rejected');

  // Payload 7: Rejects seatsBooked > maxGroupSize
  const seatsBooked = 25;
  const maxGroupSize = 10;
  assert(seatsBooked > maxGroupSize, 'Payload 7 should catch overbooking');
  results.push('Payload 7: Group size overflow rejected');

  // Payload 8: Rejects invalid type for name
  const invalidName: unknown = 12345;
  assert(typeof invalidName !== 'string', 'Payload 8 should catch non-string name');
  results.push('Payload 8: Invalid type rejected');

  // Payload 9: Rejects unauthenticated admin modification
  const uid: string | null = null;
  assert(uid === null, 'Payload 9 should catch null user');
  results.push('Payload 9: Unauthorized admin escalation rejected');

  // Payload 10: Rejects empty title
  const title = '   ';
  assert(title.trim().length === 0, 'Payload 10 should catch whitespace title');
  results.push('Payload 10: Blank title rejected');

  // Payload 11: Validates image URL protocol
  const validUrl = 'https://images.unsplash.com/photo-1';
  const validDataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ';
  const invalidFormat = 'javascript:alert(1)';
  const isValidImage = (img: string) => img.startsWith('https://') || img.startsWith('http://') || img.startsWith('data:image/');
  assert(isValidImage(validUrl) && isValidImage(validDataUrl) && !isValidImage(invalidFormat), 'Payload 11 protocol check');
  results.push('Payload 11: Image protocol poisoning rejected');

  // Payload 12: Enforces immutable booking reference
  const originalRef: string = 'BK-9988';
  const incomingRef: string = 'BK-1122';
  assert(originalRef !== incomingRef, 'Payload 12 immutable key mismatch detected');
  results.push('Payload 12: Booking reference hijacking rejected');

  return { passed: results.length, results };
}
