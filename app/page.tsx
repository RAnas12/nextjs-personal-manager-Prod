import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <div className="mt-20">
        <h2>Server Session</h2>
        <pre>{JSON.stringify(session)}</pre>
        <h2>Client Call</h2>
      </div>
      <input
        type="checkbox"
        id="checkbox"
        className="w-10 h-10"
        checked={true}
      />

      {/* // <User /> */}
    </main>
  );
}
