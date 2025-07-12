import { X } from "lucide-react";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import api from "../../utils/api";

export default function AddBirthday({ close }) {
  const [birthday, setBirthday] = useState({
    DOB: "",
  });
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBirthday((prevBody) => ({
      ...prevBody,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const { DOB } = birthday;
    if (!DOB) {
        toast.error("Please select a date");
        setLoading(false)
        return;
    }

    try {
        const res = await api.post("/client/addBirthday", {
            DOB,
        })

        if (res.status === 200) {
            toast.success("Birthday added successfully");
        } else {
            toast.error("Failed to add birthday");
            console.log("Error adding birthday:", res.data.msg);
        }
    } catch (err) {
        console.log("Error adding birthday:", err);
        toast.error("Failed to add birthday. Please try again")
    } finally {
        setLoading(false);
        close()
    }
  }

  return (
    <div className="fixed inset-0 bg-none bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Add Your Birthday
          </h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={close}>
            <X className="w=6 h-6" />
          </button>
        </div>
        <Input
          type={"date"}
          value={birthday.DOB}
          name={"DOB"}
          onChange={handleChange}
          label={"Your Birthday"}
        />
        <div className="grid grid-cols-2 gap-4">
        <Button
          className={`cancel-btn ${
            loading ? "cursor-not-allowed opacity-55" : ""
          }`}
          text = {"Cancel"}
          onClick={close}
          loading={loading}
        />
        <Button
        className={`submit-btn ${loading ? "cursor-not-allowed opacity-55" : ""}`}
        text = {`${loading ? "Saving Birthday" : "Save Birthday"}`}
        onClick = {handleSubmit}
        loading = {loading}
        />
      </div>
      </div>
    </div>
  );
}
