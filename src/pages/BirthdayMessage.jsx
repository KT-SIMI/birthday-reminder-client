import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Greeting from "../components/birthdayMessageSlides/Greeting";
import Intro from "../components/birthdayMessageSlides/Intro";
import Message from "../components/birthdayMessageSlides/Message";
import SentBy from "../components/birthdayMessageSlides/SentBy";
import NextSteps from "../components/birthdayMessageSlides/NextSteps";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const slides = [Greeting, Intro, Message, SentBy, NextSteps];

export default function BirthdayMessage() {
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [user, setUser] = useState({});
  const [friend, setFriend] = useState({});
  const currentPage = slides[currentSlide];
  // const totalPages = slides.length;
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const navigate = useNavigate();

  const friendId = params.get("friendId");
  const userId = params.get("userId");

  const next = () => {
    setDirection(1);
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
    window.scrollTo(0, 0);
    console.log("Next step entered");
  };

  const prev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
    console.log("Previous step entered");
  };

  const goToSlide = (index) => {
    if (index === currentPage) return;
    setCurrentSlide(index);
  };

  const share = () => {
    toast("This feature is currently unavailable");
  };

  const restart = () => {
    goToSlide(0);
  };

  const signup = () => {
    navigate("/");
    toast.success("You need an account to share messages");
  };

  const getMessage = async () => {
    setLoading(true);

    try {
      const res = await api.get(
        `/getMessage?friendId=${friendId}&userId=${userId}`
      );

      if (res.status === 200) {
        setUser(res.data.data.user);
        setFriend(res.data.data.friend);
      } else {
        toast.error("Couldn't get Message");
        console.log("Error getting message", res.data.msg);
      }
    } catch (err) {
      toast.error("Couldn't get Message. Please try again");
      console.log("Error getting message", err);
    } finally {
      setLoading(false);
    }
  };

  const props = {
    next,
    prev,
    user,
    friend,
    loading,
    share,
    restart,
    signup,
  };

  useEffect(() => {
    getMessage();
  }, []);

  if (loading) {
    return <h1 className="text-4xl text-black">Loading...</h1>;
  }

  return (
    <div className="flex bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] min-h-[100vh] items-center justify-center text-[#e2e8f0] overflow-hidden">
      <div className="relative w-full max-w-[800px] h-[600px] max-md:h-[100vh] max-md:border-0 max-md:rounded-[0] bg-[rgba(30, 41, 59, 0.9)] backdrop-blur-[20px] border border-[rgba(71, 85, 105, 0.3)] rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        <div className="absolute w-[95%] left-1/2 transform -translate-x-1/2 flex flex-row items-center justify-center mt-5 gap-1 z-90">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-full h-2 rounded-xl cursor-pointer transition-colors duration-800 ease-linear ${
                index === currentSlide ? "bg-white" : "bg-white/40"
              }`}
            ></span>
          ))}
        </div>
        <div className="w-full h-full relative flex group max-md:hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full"
            >
              {React.createElement(slides[currentSlide], props)}
            </motion.div>
          </AnimatePresence>

          {/* Left Hover Zone */}
          <div
            className="absolute left-0 top-0 h-full w-[40px] group-hover:flex items-center justify-center cursor-pointer hidden"
            onClick={prev}
          >
            <button className="text-white text-2xl">&lt;</button>
          </div>

          {/* Right Hover Zone */}
          <div
            className="absolute right-0 top-0 h-full w-[40px] group-hover:flex items-center justify-center cursor-pointer hidden"
            onClick={next}
          >
            <button className="text-white text-2xl">&gt;</button>
          </div>
        </div>
        <div className="md:hidden relative flex w-full h-full">
          <motion.div
            key={currentSlide}
            className="absolute w-full h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.x < -100) {
                next();
              } else if (info.offset.x > 100) {
                prev();
              }
            }}
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {React.createElement(slides[currentSlide], props)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
