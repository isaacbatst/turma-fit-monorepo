// const muscles = [
//   {id: 'shoulders', name: 'Deltóides'},
//   {id: 'chest', name: 'Peitorais'},
//   {id: 'biceps', name: 'Bíceps'},
//   {id: 'triceps', name: 'Tríceps'},
//   {id: 'back', name: 'Costas'},
//   {id: 'legs', name: 'Pernas'},
//   {id: 'calves', name: 'Panturrilhas'},
//   {id: 'abs', name: 'Abdominais'},
// ]

import { cookies } from "next/dist/client/components/headers";
import { redirect } from 'next/navigation';
import { AUTH_TOKEN_COOKIE } from "../../../constants/cookies";
import { SWRProvider } from "../../components/swr-provider";
import CreateMuscleForm from "./CreateMuscleForm";
import MusclesList from "./MusclesList";
import { fetchMusclesFromBackend } from "./fetchMusclesFromBackend";

export default async function Muscles() {
  const cookie = cookies().get(AUTH_TOKEN_COOKIE)

  if(!cookie) {
    redirect('/login')
  }

  const muscles = await fetchMusclesFromBackend(cookie.value);

  return (
    <SWRProvider 
      value={{
        muscles
      }}
    >
      <section>
        <h2 className="text-center text-3xl font-semibold mb-10">Músculos</h2>
        <ul className="flex flex-wrap gap-3 my-10">
          <CreateMuscleForm />
          <MusclesList muscles={muscles} token={cookie.value} />
        </ul>
      </section>

    </SWRProvider>
  );
}
