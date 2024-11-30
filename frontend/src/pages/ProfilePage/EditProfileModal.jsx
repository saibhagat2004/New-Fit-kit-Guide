/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useUpdateUserProfile from "../../hook/useUpdateUserProfile";

const EditProfileModal = ({ authUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    goal: "",
    weight: "",
    height: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();

  // Validation error state
  const [errors, setErrors] = useState({ weight: "", height: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data
    setFormData({ ...formData, [name]: value });

    // Validate input based on the field name
    if (name === "weight") {
      if (value < 10 || value > 120) {
        setErrors((prev) => ({
          ...prev,
          weight: "Weight must be between 10kg and 120kg.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, weight: "" })); // Clear the error
      }
    } else if (name === "height") {
      if (value <= 0 || value > 11) {
        setErrors((prev) => ({
          ...prev,
          height: "Height must be between 1ft and 11ft.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, height: "" })); // Clear the error
      }
    }
  };

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName,
        username: authUser.username,
        email: authUser.email,
        goal: authUser.goal,
        weight: authUser.weight,
        height: authUser.height,
      });
    }
  }, [authUser]);


  return (
    <>
      <button
        className="btn btn-outline rounded-full btn-sm hover:bg-orange-500 text-white border-orange-500"
        onClick={() => setIsModalOpen(true)}
      >
        Edit profile
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="modal-box border rounded-md border-gray-700 shadow-md bg-gray-800 text-white p-5">
            <h3 className="font-bold text-lg my-3 text-orange-500">Update Profile</h3>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!errors.weight && !errors.height) {
                  updateProfile(formData);
                  setIsModalOpen(false);
                }
              }}
            >
              <div className="flex flex-wrap gap-2">
                {/* <input
                  type="text"
                  placeholder="Full Name"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md bg-gray-900 text-white"
                  value={formData.fullName}
                  name="fullName"
                  onChange={handleInputChange}
                /> */}
                <input
                  type="text"
                  placeholder="Username"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md bg-gray-900 text-white"
                  value={formData.username}
                  name="username"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  placeholder="Goal"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md bg-gray-900 text-white"
                  value={formData.goal}
                  name="goal"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Weight"
                    className="input border border-gray-700 rounded p-2 input-md w-full bg-gray-900 text-white"
                    value={formData.weight}
                    name="weight"
                    onChange={handleInputChange}
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Height"
                    className="input border border-gray-700 rounded p-2 input-md w-full bg-gray-900 text-white"
                    value={formData.height}
                    name="height"
                    onChange={handleInputChange}
                  />
                  {errors.height && (
                    <p className="text-red-500 text-sm mt-1">{errors.height}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md bg-gray-900 text-white"
                  value={formData.currentPassword}
                  name="currentPassword"
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md bg-gray-900 text-white"
                  value={formData.newPassword}
                  name="newPassword"
                  onChange={handleInputChange}
                />
              </div>

              <button
                className="btn btn-primary rounded-full btn-sm text-white bg-orange-500 hover:bg-orange-600"
                disabled={isUpdatingProfile || errors.weight || errors.height}
              >
                {isUpdatingProfile ? "Updating..." : "Update"}
              </button>
            </form>
            <button
              className="btn btn-sm btn-outline mt-4 text-white border-orange-500 hover:bg-orange-500"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileModal;
