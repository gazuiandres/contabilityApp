import { axiosAuth } from "@/lib/axios";
import { useSession } from "next-auth/react";

const useRefreshToken = () => {
  const { data: session } = useSession();
  const refresh = async () => {
    if (session?.user.refresh_token) {
      const { data } = await axiosAuth.post("/auth/refresh", {
        refresh_token: session.user.refresh_token,
      });

      if (session) session.user.access_token = data.acces_token;

      return data.acces_token;
    }
  };
  return refresh;
};

export default useRefreshToken;
