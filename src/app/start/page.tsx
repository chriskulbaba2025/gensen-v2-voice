'use client';

import { useState } from 'react';

export default function StartPage() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // -------------------------------------------------------------------
  // MAIN SUBMIT HANDLER
  // -------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. CALL YOUR NEXT.JS API ROUTE (FIXED)
      const checkRes = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName: '',
          email: cleanEmail,
          business,
          url: website, // REQUIRED BY YOUR ROUTE
        }),
      });

      const checkData = await checkRes.json();
      console.log('CHECK USER RESPONSE:', checkData);

      // 2. IF EXISTS → redirect to existing-user
      if (checkData.exists === true) {
        window.location.href = `/existing-user?name=${encodeURIComponent(firstName)}`;
        return;
      }

      // 3. OTHERWISE → SUBMIT FULL BRAND DATA TO SUBMIT-BRAND (same as before)
      const payload = {
        firstName,
        email: cleanEmail,
        business,
        website,
        facebook,
        instagram,
        linkedin,
        youtube,
      };

      const submitRes = await fetch(
        'https://primary-production-77e7.up.railway.app/webhook/submit-brand',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!submitRes.ok) {
        setError('Unable to submit your information. Please try again.');
        setLoading(false);
        return;
      }

      // 4. NEW USERS → move to next screen
      window.location.href = '/screen-2';

    } catch (err) {
      console.error(err);
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------------
  // UI
  // -------------------------------------------------------------------
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-[#f5f8ff]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-full max-w-3xl border border-[#e0e6f5]"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-[#10284a]">
          Start Your Brand Voice
        </h1>

        <div className="mb-4">
          <span className="font-medium">First Name</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <span className="font-medium">Business Name</span>
          <input
            type="text"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <span className="font-medium">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <span className="font-medium">Website</span>
          <input
            type="url"
            value={website}
            placeholder="https://website.com"
            onChange={(e) => setWebsite(e.target.value)}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-medium">Facebook</span>
            <input
              type="url"
              value={facebook}
              placeholder="https://facebook.com/profile"
              onChange={(e) => setFacebook(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div>
            <span className="font-medium">Instagram</span>
            <input
              type="url"
              value={instagram}
              placeholder="https://instagram.com/handle"
              onChange={(e) => setInstagram(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div>
            <span className="font-medium">LinkedIn</span>
            <input
              type="url"
              value={linkedin}
              placeholder="https://linkedin.com/in/url"
              onChange={(e) => setLinkedin(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div>
            <span className="font-medium">YouTube</span>
            <input
              type="url"
              value={youtube}
              placeholder="https://youtube.com/@handle"
              onChange={(e) => setYoutube(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 rounded bg-[#076aff] text-white hover:bg-[#002c71] transition"
        >
          {loading ? 'Submitting…' : 'Continue'}
        </button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </main>
  );
}
