import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/tanstack-react-start";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute('/sign-in')({
  beforeLoad: async ({ context }) => {
    if (context.userId) {
      throw redirect({ to: '/' });
    }
  },
  component: SignInPage,
})

function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SignInButton>
        <Button size="lg" variant="outline">
          Sign In
        </Button>
      </SignInButton>
    </div>
  )
}
