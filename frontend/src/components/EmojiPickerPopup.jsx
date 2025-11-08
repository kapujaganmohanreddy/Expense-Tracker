import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* Icon and label */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
          {icon ? (
            <img src={icon} alt="Icon" className="w-12 h-12 rounded-lg" />
          ) : (
            <LuImage />
          )}
        </div>
        <p className="font-medium text-gray-800">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* Inline Emoji Picker */}
      {isOpen && (
        <div className="relative bg-white border border-gray-200 rounded-lg shadow-md p-2">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-100"
          >
            <LuX className="text-gray-500 text-sm" />
          </button>

          {/* The picker itself */}
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emojiData) => {
              onSelect(emojiData?.imageUrl || "");
              setIsOpen(false);
            }}
            skinTonesDisabled={true}
            searchDisabled={false}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
