import { auth } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const fetchClerkAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await auth();
  return { userId };
})

export const requireAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await auth();
  if (!userId) {
    throw redirect({ to: '/sign-in' });
  }
  return { userId };
})
