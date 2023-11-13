import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateReward() {
  const [reward, setReward] = useState({
    rewardsName: "",
    rewardsType: "",
    rewardsValidFrom: "",
    rewardsValidUntil: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const rewardId = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchRewardData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/rewards/${rewardId}`
        );
        const rewardData = response.data;

        // Populate the state with the fetched data
        setReward({
          rewardsName: rewardData.rewardsName,
          rewardsType: rewardData.rewardsType,
          rewardsValidFrom: rewardData.rewardsValidFrom,
          rewardsValidUntil: rewardData.rewardsValidUntil,
        });
      } catch (error) {
        console.error("Error fetching reward data:", error);
      }
    };
    fetchRewardData();
  }, [rewardId]);

  const handleChange = (e) => {
    setReward({
      ...reward,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8081/rewards/update/${rewardId}`,
        reward
      );
      navigate("/rewards");
    } catch (err) {
      console.error("Error updating reward:", err);
    }
  };

  return (
    <div className="flex justify-center mb-5">
      <form>
        <h1 className="mt-7 mb-5 text-md font-semibold"> Update Reward </h1>

        <div className="mb-2">
          <label>Reward Name</label>
          <input
            type="text"
            placeholder="Enter Reward Name"
            name="rewardsName"
            onChange={handleChange}
            value={reward.rewardsName}
          />
        </div>

        <label>Reward Type</label>
        <select
          name="rewardsType"
          onChange={handleChange}
          value={reward.rewardsType}
        >
          <option value=""> </option>
          <option value="Discount">Discount</option>
          <option value="Coupon">Coupon</option>
        </select>

        <label> Valid From </label>
        <input
          type="datetime-local"
          name="rewardsValidFrom"
          onChange={handleChange}
          value={reward.rewardsValidFrom}
        />

        <label> Valid Until </label>
        <input
          type="datetime-local"
          name="rewardsValidUntil"
          onChange={handleChange}
          value={reward.rewardsValidUntil}
        />

        <div className="flex justify-end mt-2">
          <button
            onClick={handleClick}
            type="submit"
            className="px-4 py-1 rounded-md bg-black text-white text-base"
          >
            {" "}
            SAVE REWARD{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateReward;
