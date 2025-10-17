import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { TokenData } from "@/types/tokenData";

export default function ProfileCard({ user }: { user: TokenData }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <Card className=" w-3/12 text-center">
      <CardHeader>
        <CardTitle>{user.username}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Username: {user.username}</p>
      </CardContent>
      <CardFooter>
        <CardAction
          onClick={handleLogout}
          className=" cursor-pointer text-center w-full border-2 border-blue-900 rounded-md p-2"
        >
          Logout
        </CardAction>
      </CardFooter>
    </Card>
  );
}
