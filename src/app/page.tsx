'use client';

import { useForm } from '../context/FormContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page1() {
  const router = useRouter();
  const { data, setData } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // ✅ Website URL validation before calling the API
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
    if (!data.url || !urlPattern.test(data.url.trim())) {
      setError('Please enter a valid website URL before continuing.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          business: data.business,
          url: data.url,
        }),
      });

      const result = await res.json();
      console.log('[CHECK RESULT]', result);

      const existsFlag =
        result?.exists === true ||
        result?.exists === 'true' ||
        result?.exists === 1 ||
        result?.exists === '1';

      if (existsFlag) {
        router.push('/existing-user');
      } else {
        router.push('/new-user');
      }
    } catch (err) {
      console.error('Submit Error:', err);
      setError('Unable to verify your account. Please try again shortly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-12 pb-[120px]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-3xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Step 1: Enter Your Business Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-medium">First Name</span>
            <input
              type="text"
              value={data.firstName || ''}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div>
            <span className="font-medium">Last Name</span>
            <input
              type="text"
              value={data.lastName || ''}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-medium">Business</span>
            <input
              type="text"
              value={data.business || ''}
              onChange={(e) => setData({ ...data, business: e.target.value })}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div>
            <span className="font-medium">Website URL</span>
            <input
              type="url"
              value={data.url || ''}
              onChange={(e) => setData({ ...data, url: e.target.value })}
              required
              placeholder="https://www.site.com"
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mb-6">
          <span className="font-medium">Email</span>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 rounded border border-gray-300 bg-white text-black hover:bg-[#076aff] hover:text-white transition-colors duration-200"
        >
          {loading ? 'Checking...' : 'Submit'}
        </button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </form>
    </main>
  );
}
