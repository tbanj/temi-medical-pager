import React from "react";
import { useChatContext } from "stream-chat-react";
import { userList } from "./";
import { CloseCreateChannel } from "../assets";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p></p>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  return (
    <div className="create-channel__container">
      {/* <ChannelNameInput /> */}
      <div className="create-channel__header">
        <p>
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
      </div>
    </div>
  );
};

export default CreateChannel;
