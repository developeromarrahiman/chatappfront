import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import micFill from '@iconify/icons-eva/mic-fill';
import roundSend from '@iconify/icons-ic/round-send';
import attach2Fill from '@iconify/icons-eva/attach-2-fill';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { styled } from '@mui/material/styles';
import {
  Input,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material';
//
import EmojiPicker from '../EmojiPicker';
import { useSelector } from 'react-redux';
import { CheckBoxOutlineBlankSharp } from '@mui/icons-material';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ChatMessageInput.propTypes = {
  disabled: PropTypes.bool,
  chatId: PropTypes.string,
  onSend: PropTypes.func,
};

export default function ChatMessageInput({
  disabled,
  chatId,
  groupTitle,
  onSend,
  isAlready,
  ...other
}) {
  const { user } = useSelector(({ user }) => user);
  const { recipients } = useSelector(({ chat }) => chat);

  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return '';
    }
    if (onSend) {
      onSend({
        body: message,
        senderId: user._id,
        participants: [user._id, ...recipients?.map((v) => v._id)],
        isGroup: Boolean(recipients?.length > 1),
        title: recipients.length > 1 ? groupTitle : null,
      });
    }
    return setMessage('');
  };

  return (
    <RootStyle {...other}>
      <Input
        disabled={disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        startAdornment={
          <InputAdornment position="start">
            <EmojiPicker
              disabled={disabled}
              value={message}
              setValue={setMessage}
            />
          </InputAdornment>
        }
        sx={{ height: '100%' }}
      />

      <Divider orientation="vertical" flexItem />

      <IconButton
        color="primary"
        disabled={!message}
        onClick={handleSend}
        sx={{ mx: 1 }}
      >
        <Icon icon={roundSend} width={24} height={24} />
      </IconButton>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </RootStyle>
  );
}
