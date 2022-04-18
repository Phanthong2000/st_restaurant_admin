import React from 'react';
import Picker, { SKIN_TONE_MEDIUM_LIGHT } from 'emoji-picker-react';
import { Box, styled } from '@mui/material';
import PropTypes from 'prop-types';

const RootStyle = styled(Box)(({ theme }) => ({
  marginBottom: '20px'
}));
BoxEmoji.prototype = {
  handleChooseEmoji: PropTypes.object
};
function BoxEmoji({ handleChooseEmoji }) {
  const onEmojiClick = (event, emojiObject) => {
    handleChooseEmoji(emojiObject);
  };
  return (
    <RootStyle>
      <Picker
        onEmojiClick={onEmojiClick}
        disableAutoFocus
        skinTone={SKIN_TONE_MEDIUM_LIGHT}
        groupNames={{
          smileys_people: 'Biểu cảm',
          animals_nature: 'Động vật',
          food_drink: 'Đồ ăn',
          travel_places: 'Phương tiện',
          activities: 'Thể thao',
          objects: 'Thời trang',
          symbols: 'Biểu tượng',
          flags: 'Lá cờ',
          recently_used: 'Đã chọn'
        }}
      />
    </RootStyle>
  );
}

export default BoxEmoji;
