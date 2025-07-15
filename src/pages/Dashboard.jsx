import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import AddBirthday from "../components/AddBirthday";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatsCard";
import { Calendar, Edit, Gift, Plus, Users } from "lucide-react";
import AddFriend from "../components/AddFriend";
import ActionCard from "../components/ActionCard";
import AddMessage from "../components/AddMessage";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSetBirtday, setShowSetBirthday] = useState(true);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState({});
  const [showAddMessage, setShowAddMessage] = useState(false);
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
    } else if (option === "friend") {
      setShowAddFriend(false);
    } else {
      setShowAddMessage(false);
    }

    navigate("/");
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data?.DOB) {
      setShowSetBirthday(false);
    }
  }, [data]);

  if (loading) {
    return <h1 className="text-4xl text-black">Loading...</h1>;
  }

  const friends = data.friends;
  //   console.log(friends)

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
          text={data.friends.length}
        />
        <StatCard
          icon={<Gift className="w-8 h-8 text-blue-600" />}
          className={"border-blue-500"}
          head={"Upcoming"}
          text={data.friends.filter((f) => f.CanAddMessage === true).length}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-8 md:px-8 px-4">
        <ActionCard
          onClick={() => setShowSetBirthday(true)}
          icon={<Calendar className="w-8 h-8 mb-2" />}
          className={"from-purple-600 to-pink-600"}
          head={`${data?.DOB ? "Edit Your Birthday" : "Add Your Birthday"}`}
          text={"Set your birthday date"}
        />
        <ActionCard
          onClick={() => setShowAddFriend(true)}
          icon={<Plus className="w-8 h-8 mb-2" />}
          className={"from-blue-600 to-purple-600"}
          head={"Add Friend"}
          text={"Add a friend's birthday"}
        />
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 max-md:p-3 mx-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Friends</h2>
        {data.friends.length === 0 ? (
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-100 mx-auto mt-8 mb-8" />
            <p className="text-gray-500">
              No friends added yet. Add your first friend!
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {friends.map((friend) => {
              return (
                <div
                  key={friend.id}
                  className="flex bg-gray-100 items-center justify-between p-4 border border-transparent rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                      {friend.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">
                        {friend.name}
                      </p>
                      <p className="text-sm text-gray-600">{friend.email}</p>
                      <p className="text-sm text-gray-500">
                        Birthday:{" "}
                        {new Date(friend.birthDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {friend.CanAddMessage && !friend.message && (
                      <button
                        onClick={() => {
                          setSelectedFriend(friend);
                          setShowAddMessage(true);
                        }}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 max-md:px-3 max-md:py-1.5 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-colors flex items-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Add Message</span>
                      </button>
                    )}
                    {friend.message && (
                      <span className="text-green-600 font-semibold max-md:text-sm">
                        ✓ Message Ready
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {showSetBirtday && <AddBirthday close={() => close("birthday")} />}
      {showAddFriend && <AddFriend close={() => close("friend")} />}
      {showAddMessage && (
        <AddMessage close={() => close("message")} friend={selectedFriend} />
      )}
    </div>
  );
}
