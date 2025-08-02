'use client';

import { useForm } from '../context/FormContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page1() {
  const router = useRouter();
  const { data, setData } = useForm();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    setSubmitted(true);

    try {
      const res = await fetch('/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          business: data.business,
          url: data.url,
        }),
      });

      const result = await res.json();
      console.log('[n8n RESPONSE]', result);

      const welcome = result?.welcomeMessage;
      if (!welcome) throw new Error('No welcomeMessage returned from backend');

      setMessage(welcome);
      setData({ ...data, message: welcome });
    } catch (err) {
      setError('We had an issue retrieving your message. Please continue — we’ll fix it shortly.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    router.push('/screen-2');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-lg shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Step 1: Enter Your Business Details
        </h1>

        <label className="block mb-4">
          <span className="font-medium">Name</span>
          <input
            type="text"
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="font-medium">Email</span>
          <input
            type="email"
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-4">
          <span className="font-medium">Business</span>
          <input
            type="text"
            value={data.business}
            onChange={e => setData({ ...data, business: e.target.value })}
            required
            className="mt-1 w-full p-2 border rounded"
          />
        </label>

        <label className="block mb-6">
          <span className="font-medium">Website URL</span>
          <input
    type="url"
    value={data.url}
    onChange={e => setData({ ...data, url: e.target.value })}
    required
    placeholder="https://www.site.com"
    className="mt-1 w-full p-2 border rounded"
  />
</label>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-2 rounded border border-gray-300 bg-white text-black hover:bg-[#076aff] hover:text-white transition-colors duration-200"
        >
          {loading ? 'Analyzing...' : 'Submit'}
        </button>
      </form>

      {submitted && (
        <div className="mt-10 text-center w-full max-w-md">
          {loading && (
            <p className="animate-pulse text-gray-600 text-lg">Analyzing your brand voice - this takes up to 90 seconds... </p>
          )}

          {!loading && message && (
            <p className="text-lg font-semibold mb-4 whitespace-pre-wrap">{message}</p>
          )}

          {!loading && error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {!loading && (
            <button
              onClick={handleNext}
              className="mt-2 px-6 py-2 rounded border border-gray-300 bg-white text-black hover:bg-[#f66630] hover:text-white transition-colors duration-200"
            >
              Next →
            </button>
          )}
        </div>
      )}
    </main>
  );
}
