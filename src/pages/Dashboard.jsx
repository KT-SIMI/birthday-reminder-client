import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import AddBirthday from "../components/AddBirthday";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatsCard";
import { Calendar, Gift, Users } from "lucide-react";
import AddFriend from "../components/AddFriend";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSetBirtday, setShowSetBirthday] = useState(true);
  const [showAddFriend, setShowAddFriend] = useState(false)
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get("/client/dashboard");

      if (res.status === 200) {
        setData(res.data.data);
      } else {
        console.error("Failed to fetch data:", res.data.data.msg);
        navigate("/login");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const close = (option) => {
    if (option === "birthday") {
        setShowSetBirthday(false);
    } else {
        setShowAddFriend(false)
    }
    
  };

  const logout = async () => {
    try {
      const res = await api.get("/logout");
      if (res.status === 200) {
        toast.success("Logged out");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error logging out:", err);
      toast.error("Failed to log out. Please try again");
    }
  };

  const checkDOB = () => {
    if (data.DOB) {
      setShowSetBirthday(false);
      return;
    }
  };

  useEffect(() => {
    fetchData();
    checkDOB();
  }, []);

  if (loading) {
    return <h1 className="text-4xl text-white">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={data} logout={logout} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8 md:px-8 px-4">
        <StatCard
          icon={<Calendar className="w-8 h-8 text-purple-600" />}
          className={"border-purple-500"}
          head={"Your Birthday"}
          text={`${
            data?.DOB ? new Date(data.DOB).toLocaleDateString() : "Not set"
          }`}
        />
        <StatCard
          icon={<Users className="w-8 h-8 text-pink-600" />}
          className={"border-pink-500"}
          head={"Friends"}
          text={
            data.friends.length
          }
        />
         <StatCard
          icon={<Gift className="w-8 h-8 text-blue-600" />}
          className={"border-blue-500"}
          head={"Upcoming"}
          text={data.friends.filter(f => f.CanAddMessage === true).length}
        />
      </div>

      {showSetBirtday && <AddBirthday close={() => close("birthday")} />}
        {showAddFriend && <AddFriend close = {() => close("friend")} />}
    </div>
  );
}
