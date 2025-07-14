import { useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import { toast } from "react-toastify";
import AuthLink from "../components/AuthLink";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "../auth.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevBody) => ({
      ...prevBody,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { firstname, lastname, email, password, confirmPassword } = formData;
    if (password && confirmPassword && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/signup", {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      });

      if (res.status === 200) {
        toast.success("Account created successfully");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/");
      }
    } catch (err) {
      console.log("Error creating account:", err);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="authContainer">
        <Header />
        <form className="">
          <div className="flex w-full flex-row gap-4 max-md:flex-col max-md:gap-0">
            <Input
              type={"text"}
              name={"firstname"}
              value={formData.firstname}
              onChange={handleChange}
              placeHolder={"Firstname"}
              label={"Firstname"}
            />
            <Input
              type={"text"}
              name={"lastname"}
              value={formData.lastname}
              onChange={handleChange}
              placeHolder={"Lastname"}
              label={"Lastname"}
            />
          </div>
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
            placeHolder={"Password must contain at least 8 characters"}
            label={"Password"}
          />
          <Input
            type={"password"}
            name={"confirmPassword"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeHolder={"Type your password again"}
            label={"Confirm Password"}
          />
          <Button
            type={"submit"}
            onClick={handleSubmit}
            text={`${loading ? "Creating Account..." : "Create Account"}`}
            className={`submit-btn ${
              loading ? "cursor-not-allowed opacity-55" : ""
            }`}
            loading={loading}
          />

          <div className="text-xs/[1.4] text-[#718096] mt-4">
            By creating an account, you agree to our{" "}
            <a
              href="#"
              //   onclick={toast("We'd send you emails.")}
              className="text-[#667eea] no-underline hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              //   onClick={toast("We wont give anyone your email address")}
              className="text-[#667eea] no-underline hover:underline"
            >
              Privacy Policy
            </a>
          </div>
        </form>
        <AuthLink
          text={"Already have an account"}
          linkText={"Log In"}
           onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}
