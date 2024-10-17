import { User, useUserStore } from "@/store/user";
import sendRequest from "@/utilities/sendRequest";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthCheckProps {
  children: React.ReactNode;
}

const verifyToken = async (
  onSuccess: (user: User) => void,
  onError: (error: any) => void
) => {
  try {
    console.log("verifying token");
    const response = await sendRequest("/auth/verify", "GET", {});
    // SAFETY:
    // We can safely assume that `data` contains a `User` object
    const user: User = response.data;
    if (user) {
      onSuccess(user);
    } else {
      onError("no user found when verifying token");
    }
  } catch (error) {
    console.error("Error verifying token", error);
    onError(error);
  }
};
const AuthCheck = (props: AuthCheckProps) => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      await verifyToken(
        (user) => {
          setUser(user);
          setLoading(false);
        },
        (_) => {
          setLoading(false);
          router.replace("/login");
        }
      );
    };
    verify();
  }, []);

  if (loading || !useUserStore.getState().user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  } else {
    return <>{props.children}</>;
  }
};

export default AuthCheck;
