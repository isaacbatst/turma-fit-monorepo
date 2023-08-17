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
import MusclesSection from "./MusclesSection";
import { fetchMusclesFromBackend } from "./fetchMusclesFromBackend";
import { ToastContainer } from "react-toastify";

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
      <MusclesSection muscles={muscles} token={cookie.value} />
      <ToastContainer />
    </SWRProvider>
  );
}
