import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelListContainer, ChannelContainer, Auth } from "./components";
import config from "./constant/config";
import "./App.css";
import "stream-chat-react/dist/css/index.css";
import "react-toastify/dist/ReactToastify.css";

const cookies = new Cookies();

const apiKey = config.STREAM_API_KEY;
const client = StreamChat.getInstance(apiKey);
const authToken = cookies.get("token");

if (authToken) {
  client.connectUser(
    {
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      id: cookies.get("userId"),
      phoneNumber: cookies.get("phoneNumber"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}
const App = () => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  /* useEffect(() => {
    const checkToken = async () => {
      if (authToken) {
        const resData = await client.connectUser(
          {
            name: cookies.get("username"),
            fullName: cookies.get("fullName"),
            id: cookies.get("userId"),
            phoneNumber: cookies.get("phoneNumber"),
            image: cookies.get("avatarURL"),
            hashedPassword: cookies.get("hashedPassword"),
          },
          authToken
        );
      }
    };
    checkToken();
    return () => {};
  }, []); */

  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />

        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
