import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../services/ChatService";
import { useAuth } from "../../contexts/UserContext";
import { generateAvatar } from "../../utils/GenerateAvatar";
import { Button } from "@material-tailwind/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const { user, setError } = useAuth();

  // Fetching Avatars
  useEffect(() => {
    const fetchData = () => {
      const res = generateAvatar();
      setAvatars(res);
    };
    fetchData();
  }, []);

  // Updating Profile to DB
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedAvatar === undefined) {
      return setError("Please select an avatar");
    }
    try {
      setError("");
      setLoading(true);
      const data = {
        username: username,
        photoURL: avatars[selectedAvatar],
      };
      await updateProfile(user.id, data);
      navigate("/");
    } catch (e) {
      setError("Failed to update profile");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-5 text-3xl text-center tracking-tight font-light dark:text-white">
            Pick an avatar
          </h2>
        </div>
        <form className="space-y-3" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap -m-1 md:-m-2">
            {avatars.map((avatar, index) => (
              <div key={index} className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className={classNames(
                      index === selectedAvatar
                        ? "border-4  border-primary-700 dark:border-primary-700"
                        : "cursor-pointer hover:border-4 hover:border-primary-700",
                      "block object-cover object-center w-36 h-36 rounded-full"
                    )}
                    src={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-md shadow-sm pt-8 ">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              className="outline-teal-400 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter a Display Name (Optional)"
              defaultValue={user.name && user.name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="shadow-none hover:shadow-none w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
