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

type AuthFormProps = {
  formType: "signin" | "signup";
  onSubmit: (
    formType: "signin" | "signup",
    data: Record<string, string>
  ) => void;
};

export default function AuthForm({ formType, onSubmit }: AuthFormProps) {
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    onSubmit(formType, data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {formType === "signin" ? "The Day is Yours" : "Make Your Day Happen"}
        </CardTitle>
        <CardDescription>
          {formType === "signin"
            ? "All your plans, projects, and goals are waiting. Sign in to start checking things off your list."
            : "Take control of your tasks and projects. Sign up to unlock a more productive you."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          {formType === "signup" && (
            <>
              <div className="flex flex-col gap-1">
                <Label>Username</Label>
                <Input
                  name="username"
                  type="text"
                  placeholder="ammarhairiHD"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label>Name</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="ammar hairi"
                  required
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-1">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder="example@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              placeholder="*******"
              required
            />
          </div>

          <CardFooter className="flex justify-center">
            <Button type="submit" variant="outline">
              {formType === "signin" ? "Sign In" : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
