import { SignInForm } from "@/components/auth/signin-form";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to sign in
          </p>
        </div>
        <SignInForm />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <form action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}>
          <Button type="submit" variant="outline" className="w-full">
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <span>Don&apos;t have an account? </span>
          <a 
            href="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
} 