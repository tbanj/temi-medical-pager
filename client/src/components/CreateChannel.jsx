import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { UserList } from "./";
import { CloseCreateChannel } from "../assets";
import { notifyError } from "../utils/helpers/ToastHelpers";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);

  const handleChange = (event) => {
    event.preventDefault();
    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        type="text"
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name (no spaces)"
      />
      <p>Add Members</p>
      {/* <UserList /> */}
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");

  const createChannel = async (e) => {
    e.preventDefault();
    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      if (channelName.length < 1 || selectedUsers.length < 1) {
        notifyError(`You need to have a channel name & select member's`);
        return;
      }
      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers(client.userID);
      setActiveChannel(newChannel);
    } catch (error) {
      console.error();
    }
  };

  return (
    <div className="create-channel__container">
      {/* <ChannelNameInput /> */}
      <div className="create-channel__header">
        <p>
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p className="">
          {createType === "team" ? "Create Channel" : "Create a Message Group"}
        </p>
      </div>
    </div>
  );
};

export default CreateChannel;
