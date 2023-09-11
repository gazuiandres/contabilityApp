import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";

import axios from "../lib/axios";

const RecoveryEmail = () => {
  const session = useSession()
  const router = useRouter();
  const { toast } = useToast();
  const unauthenticated = session.status === "unauthenticated"

  if (router.isReady && (!router.query.token ) || unauthenticated) {
    router.push("/");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const data = new FormData(event.currentTarget);
      const config = {
        headers: { Authorization: `Bearer ${router.query.token}` },
      };
  
      await axios.post("/auth/update", data, config);
      toast({
        title: "We updated your email",
        description: "You will redirect to login page in a few seconds",
      });
      setTimeout(() => {
        signOut()
      }, 3000);
    } catch (error) {
      toast({
        title: "Error updating your email",
        description: "something goes wrong :(",
      });
    }
  };

  return (
    <div
      className={`min-h-screen text-white bg-mainBackground pt-28 pb-[3.25rem]`}
    >
      <h1 className="font-bold text-center text-3xl mb-14">Change Email</h1>

      <section className="w-[69%] mx-auto xl:max-w-[400px]">
        <form onSubmit={handleSubmit} className="mb-10">
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            className="border-white mb-8"
            required
          />
          <Button type="submit" className="w-full mb-6 block">
            Change email
          </Button>
        </form>
      </section>
    </div>
  );
};

export default RecoveryEmail;
