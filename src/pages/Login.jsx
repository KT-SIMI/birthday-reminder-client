import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import AuthLink from "../components/AuthLink";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";
import "../auth.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const { email, password } = formData;

    if (!email || !password) return toast.error("Please fill in all fields");

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success(`Welcome ${res.data.data.firstname}`);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (err) {
      console.log("Error logging in:", err);
      toast.error("Failed to log in. Confirm credentials");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="authContainer">
        <Header />
        <form className="">
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
          <Button
            type={"submit"}
            onClick={handleSubmit}
            text={`${loading ? "Logging In..." : "Log In"}`}
            className={`submit-btn ${
              loading ? "cursor-not-allowed opacity-55" : ""
            }`}
            loading={loading}
          />

          <div className="text-xs/[1.4] text-[#718096] mt-4 text-center">
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
          text={"Don't have an account?"}
          linkText={"Sign Up"}
          onClick={() => navigate("/signup")}
        />
      </div>
    </div>
  );
}
