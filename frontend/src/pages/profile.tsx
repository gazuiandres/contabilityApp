import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useAxiosAuth from "@/lib/axios/hooks/useAxiosAuth";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const [openEmail, setOpenEmail] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const axios = useAxiosAuth();

  const handleChangeEmail = async () => {
    try {
      setOpenEmail(false);
      const { data } = await axios.get("/auth/email-recovery");
      toast({
        title: data.message,
        description: "We sent you a link to change your email",
      });
    } catch (error) {
      toast({
        title: "Error sending email",
        description: "Something goes wrong :(",
      });
    }
  };

  const handleChangePassword = async () => {
    try {
      setOpenPassword(false);
      const { data } = await axios.get("/auth/password-recovery");
      toast({
        title: data.message,
        description: "We sent you a link to change your password!",
      });
    } catch (error) {
      toast({
        title: "Error sending email",
        description: "Something goes wrong :(",
      });
    }
  };

  return (
    <div
      className={`min-h-screen text-white bg-mainBackground pt-28 pb-[3.25rem]`}
    >
      <h1 className="font-bold text-center text-3xl mb-14">Profile</h1>

      <section className="w-[69%] mx-auto xl:max-w-[400px]">
        <div className="mb-10">
          <p className="text-sm mb-4">Your email</p>
          {session && (
            <Input
              type="text"
              disabled
              className="border-white "
              value={session.user.email}
            />
          )}
        </div>

        <div className="w-[70%] mx-auto mb-10">
          <AlertDialog open={openEmail} onOpenChange={setOpenEmail}>
            <AlertDialogTrigger asChild>
              <Button
                className="border-[1.6px] w-full border-white rounded-full hover:bg-transparent"
                variant="outline"
              >
                Change your email
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[70%] mx-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you want change your Email?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to change your email?. If yes, please
                  click continue button and we will send you and email to change
                  it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleChangeEmail}
                  className="mb-4 md:mb-0"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="w-[70%] mx-auto">
          <AlertDialog open={openPassword} onOpenChange={setOpenPassword}>
            <AlertDialogTrigger asChild>
              <Button
                className="border-[1.6px] w-full  border-white rounded-full hover:bg-transparent"
                variant="outline"
              >
                Change your password
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[70%] mx-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you want change your password?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to change your password?. If yes, please
                  click continue button and we will send you and email to change
                  it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleChangePassword}
                  className="mb-4 md:mb-0"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </div>
  );
};

export default Profile;
