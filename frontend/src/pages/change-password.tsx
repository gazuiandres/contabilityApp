import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "../lib/axios";

const RecoveryPassword = () => {
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const unauthenticated = session.status === "unauthenticated";

  if ((router.isReady && !router.query.token) || unauthenticated) {
    router.push("/");
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const config = {
        headers: { Authorization: `Bearer ${router.query.token}` },
      };

      await axios.post("/auth/update", data, config);
      toast({
        title: "We updated your password",
        description: "You will redirect to login page in a few seconds",
      });
      setTimeout(() => {
        signOut();
      }, 3000);
    } catch (error) {
      toast({
        title: "Error updating your password",
        description: "something goes wrong :(",
      });
    }
  };
  return (
    <div
      className={`min-h-screen text-white bg-mainBackground pt-28 pb-[3.25rem]`}
    >
      <h1 className="font-bold text-center text-3xl mb-14">Change password</h1>

      <section className="w-[69%] mx-auto xl:max-w-[400px]">
        <form onSubmit={handleSubmit} className="mb-10">
          <div>
            <Label htmlFor="password" className="mb-2">
              New password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              required
              className="border-white mb-8"
            />
          </div>

          <div>
            <Label htmlFor="confirm_password" className="mb-2">
              Confirm password
            </Label>
            <Input
              type="password"
              id="confirm_password"
              name="confirm_password"
              required
              autoComplete="off"
              className="border-white mb-8"
            />
          </div>
          <Button type="submit" className="w-full mb-6 block">
            Change password
          </Button>
        </form>
      </section>
    </div>
  );
};

export default RecoveryPassword;
