import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import AuthLink from "../components/AuthLink";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevBody) => ({
      ...prevBody,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) return toast.error("Please fill in all fields");

    toast.success("Welcome");
  };

  return (
    <div className="authContainer">
      <Header />
      <form classname="">
        <Input
          type={"email"}
          name={"email"}
          value={formData.email}
          onChange={handleChange}
          placeHolder={"Email"}
          label={"Email Address"}
        />
        <Input
          type={"password"}
          name={"password"}
          value={formData.password}
          onChange={handleChange}
          placeHolder={"Enter your password"}
          label={"Password"}
        />
        <Button type={"submit"} onClick={handleSubmit} text={"Log In"} />

        <div className="text-xs/[1.4] text-[#718096] mt-4">
          Forgot your password?{" "}
          <a
            href="#"
            //   onclick={toast("We'd send you emails.")}
            className="text-[#667eea] no-underline hover:underline"
          >
            Reset your password
          </a>
        </div>
      </form>
       <AuthLink
             text = {"Don't have an account?"}
             linkText = {"Sign Up"}
             link = {'/signup'} />
    </div>
  );
}
