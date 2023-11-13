import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Reward() {
  const [reward, setReward] = useState([]);

  useEffect(() => {
    const fetchAllRewards = async () => {
      try {
        const res = await axios.get("http://localhost:8081/rewards");
        setReward(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRewards();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this reward?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
      confirmButtonColor: "#d55",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:8081/rewards/" + id);
          Swal.fire("Deleted!", "Your reward has been deleted.", "success");
          window.location.reload();
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error",
            "An error occurred while deleting the reward.",
            "error"
          );
        }
      }
    });
  };

  return (
    <>
      <div className="flex justify-end m-2 mb-5 mt-6">
        <Link
          to="/rewards/add"
          className="px-4 py-2 rounded-md bg-black text-white"
        >
          {" "}
          Add +
        </Link>
      </div>
      <table className="basic mt-10">
        <thead>
          <tr>
            <td> Rewards ID </td>
            <td> Rewards Name </td>
            <td> Rewards Type </td>
            <td> Valid From </td>
            <td> Valid Until </td>
            <td> Actions </td>
          </tr>
        </thead>
        <tbody>
          {reward.map((data, i) => (
            <tr key={i}>
              <td>{data.rewards_id}</td>
              <td>{data.rewards_name}</td>
              <td>{data.rewards_type}</td>
              <td>{data.rewards_validFrom}</td>
              <td>{data.rewards_validUntil}</td>
              <td>
                <button className="btn-green">
                  <Link to={`/rewards/update/${data.rewards_id}`}>
                    <BiEdit />
                  </Link>
                </button>
                <button
                  className="btn-red"
                  onClick={() => handleDelete(data.rewards_id)}
                >
                  <MdOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Reward;
