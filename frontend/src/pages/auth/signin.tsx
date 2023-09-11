import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const signin = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <Card className="w-[80vw] mx-auto mt-32 md:mt-60 max-w-[450px] xl:mt-32">
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input id="email" name="email" required placeholder="Your email" autoComplete="off" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <Input type="password" name="password" required id="Email" placeholder="Your password" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="block">
          <Button type="submit" className="w-full mb-6 block">
            Sign in
          </Button>
          <div className="w-full text-center">
            <Link className="block w-full" href="/auth/signup">
              Create account
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default signin;
