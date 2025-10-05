import React from "react";

export default function Settings({ settings, onChange, onSubmit }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">User Settings</h2>
      <form className="bg-white rounded shadow p-4" onSubmit={onSubmit}>
        <label className="block mb-2">Email for alerts:
          <input type="email" name="email" value={settings.email} onChange={onChange} className="border p-1 ml-2" />
        </label>
        <label className="block mb-2">Push token:
          <input type="text" name="push_token" value={settings.push_token} onChange={onChange} className="border p-1 ml-2" />
        </label>
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">Save Settings</button>
      </form>
    </section>
  );
}
