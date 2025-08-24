// app/page.tsx
import Link from "next/link";

async function getProjects() {
  // Public GitHub API – fine to start; later you can add a token via env
  const res = await fetch(
    "https://api.github.com/users/ArshdKhan/repos?sort=updated&per_page=6",
    { next: { revalidate: 3600 } } // ISR-style revalidate each hour
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Arshad Khan</h1>
        <p className="mt-4 text-lg opacity-80">
          Full-stack developer • Next.js • Go • Python • Docker
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="mailto:a.arshd.khn@gmail.com" className="rounded-xl px-5 py-3 bg-white/10 hover:bg-white/20">
            Contact
          </Link>
          <Link href="https://github.com/ArshdKhan" className="rounded-xl px-5 py-3 ring-1 ring-white/20 hover:bg-white/5">
            GitHub
          </Link>
          <Link href="https://www.linkedin.com/in/a-arshad-khan/" className="rounded-xl px-5 py-3 ring-1 ring-white/20 hover:bg-white/5">
            LinkedIn
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Recent Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p: any) => (
            <a key={p.id} href={p.html_url} target="_blank" className="block rounded-2xl p-5 ring-1 ring-white/10 hover:bg-white/5">
              <div className="text-lg font-medium">{p.name}</div>
              <div className="mt-2 text-sm opacity-70 line-clamp-3">{p.description ?? "—"}</div>
              <div className="mt-3 text-xs opacity-50">{p.language ?? "Multiple"}</div>
            </a>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}

// --- Server Action contact form (React 19 + App Router)
async function sendMessage(formData: FormData) {
  "use server";
  // For now, just log it. Later: send email via an API or store to DB/KV.
  console.log("Message from", formData.get("email"), ":", formData.get("message"));
}

function Contact() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Say Hi</h2>
      <form action={sendMessage} className="space-y-3 max-w-lg">
        <input name="email" type="email" required placeholder="you@example.com" className="w-full rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10" />
        <textarea name="message" required placeholder="Your message..." className="w-full rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 h-32" />
        <button className="rounded-xl px-5 py-3 bg-white/10 hover:bg-white/20">Send</button>
      </form>
    </section>
  );
}