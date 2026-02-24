"use client";

import { useEffect, useState, useCallback } from "react";

interface City {
  id: string;
  cityName: string;
  slug: string;
  region: string | null;
  shortLocalHook: string | null;
  published: boolean;
}

function authHeader(user: string, pass: string) {
  return "Basic " + btoa(`${user}:${pass}`);
}

export default function AdminPage() {
  const [auth, setAuth] = useState({ user: "", pass: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<City | null>(null);
  const [form, setForm] = useState({
    cityName: "",
    slug: "",
    region: "",
    shortLocalHook: "",
    published: true,
  });

  const headers = useCallback(
    () => ({
      "Content-Type": "application/json",
      Authorization: authHeader(auth.user, auth.pass),
    }),
    [auth]
  );

  const loadCities = useCallback(async () => {
    const res = await fetch("/api/cities", { headers: { Authorization: authHeader(auth.user, auth.pass) } });
    if (res.ok) setCities(await res.json());
  }, [auth]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/cities", { headers: { Authorization: authHeader(auth.user, auth.pass) } });
    if (res.ok) {
      setLoggedIn(true);
      setCities(await res.json());
    } else {
      setError("Ungültige Zugangsdaten");
    }
  }

  useEffect(() => {
    if (loggedIn) loadCities();
  }, [loggedIn, loadCities]);

  function resetForm() {
    setForm({ cityName: "", slug: "", region: "", shortLocalHook: "", published: true });
    setEditing(null);
  }

  function startEdit(city: City) {
    setEditing(city);
    setForm({
      cityName: city.cityName,
      slug: city.slug,
      region: city.region || "",
      shortLocalHook: city.shortLocalHook || "",
      published: city.published,
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const payload = {
      ...form,
      region: form.region || null,
      shortLocalHook: form.shortLocalHook || null,
    };

    const url = editing ? `/api/cities/${editing.id}` : "/api/cities";
    const method = editing ? "PATCH" : "POST";

    const res = await fetch(url, { method, headers: headers(), body: JSON.stringify(payload) });
    if (res.ok) {
      resetForm();
      await loadCities();
    } else {
      const json = await res.json().catch(() => ({}));
      setError(typeof json.error === "string" ? json.error : JSON.stringify(json.error));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Stadt wirklich löschen?")) return;
    await fetch(`/api/cities/${id}`, { method: "DELETE", headers: headers() });
    await loadCities();
  }

  async function togglePublished(city: City) {
    await fetch(`/api/cities/${city.id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({ published: !city.published }),
    });
    await loadCities();
  }

  if (!loggedIn) {
    return (
      <div className="mx-auto max-w-sm px-4 py-24">
        <h1 className="mb-6 text-2xl font-bold">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Benutzername"
            value={auth.user}
            onChange={(e) => setAuth((a) => ({ ...a, user: e.target.value }))}
            className="w-full rounded border px-3 py-2 text-sm"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={auth.pass}
            onChange={(e) => setAuth((a) => ({ ...a, pass: e.target.value }))}
            className="w-full rounded border px-3 py-2 text-sm"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full rounded bg-brand-600 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">Städte verwalten</h1>

      {/* Form */}
      <form onSubmit={handleSave} className="mb-8 space-y-3 rounded-lg border bg-white p-5">
        <h2 className="font-semibold">{editing ? "Stadt bearbeiten" : "Neue Stadt"}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Stadtname *"
            value={form.cityName}
            onChange={(e) => setForm((f) => ({ ...f, cityName: e.target.value }))}
            required
            className="rounded border px-3 py-2 text-sm"
          />
          <input
            placeholder="Slug *"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            required
            className="rounded border px-3 py-2 text-sm"
          />
          <input
            placeholder="Region / Bundesland"
            value={form.region}
            onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
            className="rounded border px-3 py-2 text-sm"
          />
          <input
            placeholder="Lokaler Hook (1 Satz)"
            value={form.shortLocalHook}
            onChange={(e) => setForm((f) => ({ ...f, shortLocalHook: e.target.value }))}
            className="rounded border px-3 py-2 text-sm"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
          />
          Veröffentlicht
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-2">
          <button type="submit" className="rounded bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            {editing ? "Speichern" : "Anlegen"}
          </button>
          {editing && (
            <button type="button" onClick={resetForm} className="rounded border px-4 py-2 text-sm">
              Abbrechen
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Stadt</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {cities.map((city) => (
              <tr key={city.id}>
                <td className="px-4 py-3 font-medium">{city.cityName}</td>
                <td className="px-4 py-3 text-gray-500">{city.slug}</td>
                <td className="px-4 py-3 text-gray-500">{city.region || "–"}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => togglePublished(city)}
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      city.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {city.published ? "Online" : "Offline"}
                  </button>
                </td>
                <td className="flex gap-2 px-4 py-3">
                  <button onClick={() => startEdit(city)} className="text-brand-600 hover:underline">
                    Bearbeiten
                  </button>
                  <a href={`/werbetechnik/${city.slug}`} target="_blank" className="text-gray-500 hover:underline">
                    Ansehen
                  </a>
                  <button onClick={() => handleDelete(city.id)} className="text-red-500 hover:underline">
                    Löschen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
