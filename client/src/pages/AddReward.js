import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddReward() {
  const [reward, setReward] = useState({
    rewardsName: "",
    rewardsType: "",
    rewardsValidFrom: "",
    rewardsValidUntil: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setReward((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const { rewardsName, rewardsType, rewardsValidFrom, rewardsValidUntil } =
        reward;
      await axios.post("http://localhost:8081/rewards", {
        rewards_name: rewardsName,
        rewards_type: rewardsType,
        rewards_validFrom: rewardsValidFrom,
        rewards_validUntil: rewardsValidUntil,
      });
      navigate("/rewards");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mb-5">
      <form>
        <h1 className="mt-7 mb-5 text-md font-semibold"> Add Reward </h1>

        <div className="mb-2">
          <label>Reward Name</label>
          <input
            type="text"
            placeholder="Enter Reward Name"
            name="rewardsName"
            onChange={handleChange}
          />
        </div>

        <label>Reward Type</label>
        <select name="rewardsType" onChange={handleChange}>
          <option value=""> </option>
          <option value="Discount">Discount</option>
          <option value="Coupon">Coupon</option>
        </select>

        <label> Valid From </label>
        <input
          type="datetime-local"
          name="rewardsValidFrom"
          value={reward.rewardsValidFrom}
          onChange={handleChange}
        />

        <label> Valid Until </label>
        <input
          type="datetime-local"
          name="rewardsValidUntil"
          value={reward.rewardsValidUntil}
          onChange={handleChange}
        />

        <div className="flex justify-end mt-2">
          <button
            onClick={handleClick}
            type="submit"
            className="px-4 py-1 rounded-md bg-black text-white text-base"
          >
            {" "}
            SAVE REWARD
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReward;
