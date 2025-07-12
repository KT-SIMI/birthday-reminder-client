import { useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import Button from "./Button";

export default function AddMessage({ friend, close }) {
  const [body, setBody] = useState({
    message: "",
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

    const { message } = body;

    if (!message) {
      toast.error("Please type a message");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(`/client/addMessage?friendId=${friend.id}`, {
        message,
      });

      if (res.status === 200) {
        toast.success("Message added successfully");
      } else {
        toast.error("Failed to add message");
        console.log("Error adding message:", res.data.msg);
      }
    } catch (err) {
      console.log("Error adding birthday:", err);
      toast.error("Failed to add birthday. Please try again");
    } finally {
      setLoading(false);
      close();
    }
  };

  return (
    <div className="fixed inset-0 bg-none bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Birthday Message for {friend?.name}
          </h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={close}>
            <X className="w=6 h-6" />
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <label className="flex text-sm font-medium text-gray-700 mb-2 justify-between items-center">
              <span>Your Special Birthday Message</span>
              <span className="text-xs text-gray-500">
                {body.message.length}/200
              </span>
            </label>
            <textarea
              rows={6}
              maxLength={200}
              placeholder="Write a heartfelt birthday message for your friend..."
              value={body.message}
              name={"message"}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>
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
              className={`edit-btn ${
                loading ? "cursor-not-allowed opacity-55" : ""
              }`}
              text={`${loading ? "Adding Message" : "Add Message"}`}
              onClick={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
