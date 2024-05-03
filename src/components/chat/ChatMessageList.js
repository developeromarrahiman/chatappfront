import PropTypes from 'prop-types';
import { findIndex } from 'lodash';
import { useEffect, useState, useRef } from 'react';
//
import Scrollbar from '../Scrollbar';
// import LightboxModal from '../../LightboxModal';
import ChatMessageItem from './ChatMessageItem';

// ----------------------------------------------------------------------

ChatMessageList.propTypes = {
  conversation: PropTypes.object.isRequired,
};

export default function ChatMessageList({
  conversation,
  myId,
  setActiveId,
  activeId,
  setDelete,
  setReply,
  sendCount,
  conversationKey,
}) {
  const scrollRef = useRef();

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [sendCount]);

  return (
    <>
      <Scrollbar
        scrollableNodeProps={{ ref: scrollRef }}
        sx={{ p: 3, height: 1 }}
      >
        {conversation?.messages.map((message) => (
          <ChatMessageItem
            isMe={message?.senderId?._id === myId}
            key={Math.random()}
            message={message}
            conversation={conversation}
            setActiveId={setActiveId}
            activeId={activeId}
            setDelete={setDelete}
            setReply={setReply}
          />
        ))}
      </Scrollbar>

      {/* <LightboxModal
        images={images}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      /> */}
    </>
  );
}
