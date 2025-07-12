import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { X } from "lucide-react";
import Input from "./Input";
import Button from "./Button";


export default function AddFriend({ close }) {
  const [body, setBody] = useState({
    name: "",
    email: "",
    birthDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBody((prevBody) => ({
      ...prevBody,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, birthDate } = body;

    if (!name || !email || !birthDate) {
      toast.error("Please select all required fields");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/client/addFriend", {
        name,
        email,
        birthDate,
      });

      if (res.status === 200) {
        toast.success("New Friend Added");
        close();
      } else {
        toast.error("Failed to add friend");
        console.log("Error adding friend:", res.data.msg);
      }
    } catch (err) {
      console.log("Error adding friend:", err);
      toast.error("Failed to add friend. Please try again");
    } finally {
      setLoading(false);
      close();
    }
  };

  return (
    <div className="fixed inset-0 bg-none bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add A Friend</h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={close}>
            <X className="w=6 h-6" />
          </button>
        </div>
        <Input
          type={"text"}
          value={body.name}
          name={"name"}
          onChange={handleChange}
          label={"Name"}
        />
        <Input
          type={"email"}
          value={body.email}
          name={"email"}
          onChange={handleChange}
          label={"Email"}
        />
        <Input
          type={"date"}
          value={body.birthDate}
          name={"birthDate"}
          onChange={handleChange}
          label={"Birth Day"}
        />
        <div className="grid grid-cols-2 gap-4">
          <Button
            className={`cancel-btn ${
              loading ? "cursor-not-allowed opacity-55" : ""
            }`}
            text={"Cancel"}
            onClick={close}
            loading={loading}
          />
          <Button
            className={`submit-btn ${
              loading ? "cursor-not-allowed opacity-55" : ""
            }`}
            text={`${loading ? "Adding Friend" : "Add Friend"}`}
            onClick={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
