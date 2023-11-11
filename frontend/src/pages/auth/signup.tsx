import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import { useToast } from "@/components/ui/use-toast";

import axios from "@/lib/axios";
import { useState } from "react";

const Signup = () => {
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email")?.toString().toLowerCase();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirm_password")?.toString();

    if (password !== confirmPassword) {
      setError("Passwords are not the same");
      return;
    }
    console.log({ email, password, confirmPassword });
    await axios.post("/auth/signup", { email, password, confirmPassword });
    toast({
      title: "Registration success",
      description: "You will be redirected to signIn page",
    });
    event.target.reset();
    setTimeout(() => {
      router.push("/auth/signin");
    }, 3000);
  };

  return (
    <Card className="w-[80vw] mx-auto mt-32 md:mt-60 max-w-[450px] xl:mt-32">
      <CardHeader>
        <CardTitle className="text-center">Register</CardTitle>
        <CardDescription></CardDescription>
        {error && <ErrorAlert message={error} />}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Your email"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword" className="mb-2">
                Confirm password
              </Label>
              <Input
                type="password"
                name="confirm_password"
                id="confirmP"
                placeholder="Confirm your password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="block">
          <Button type="submit" className="w-full mb-6">
            Sign Up
          </Button>
          <div className="w-full text-center">
            <Link className="block w-full" href="/auth/signin">
              Back to Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Signup;
