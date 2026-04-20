import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Out",
  description: "Sign out of your account",
};

export default function SignOutPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Are you sure you want to sign out?
          </h1>
          <p className="text-sm text-muted-foreground">
            You will need to sign in again to access your account
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <a href="/">
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </a>
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}>
            <Button type="submit" className="w-full">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
} 