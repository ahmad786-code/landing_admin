import React, { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure your firebase configuration is correct
import UploadMedia from '../components/UploadMedia';

const mdParser = new MarkdownIt();

const StoryEditor = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [isFeaturedStory, setIsFeaturedStory] = useState(false);

  const handleEditorChange = ({ text }) => {
    setMarkdownContent(text);
  };

  const handleSave = async () => {
    try {
      const collectionName = isFeaturedStory ? 'featured_stories' : 'top_stories';

      // Extract data from markdown content
      const imgMatch = markdownContent.match(/!\[.*?\]\((.*?)\)/);
      const titleMatch = markdownContent.match(/# (.*?)(\n|$)/);
      const authorDateMatch = markdownContent.match(/\*\*(.*?)\*\* \| (.*?)(\n|$)/);

      const newStory = {
        imgSrc: imgMatch ? imgMatch[1] : '',
        title: titleMatch ? titleMatch[1] : '',
        author: authorDateMatch ? authorDateMatch[1] : '',
        date: authorDateMatch ? authorDateMatch[2] : '',
        content: markdownContent,
        timestamp: Timestamp.now(),
      };

      await addDoc(collection(db, collectionName), newStory);

      setSavedMessage('Markdown content saved successfully!');
    } catch (error) {
      console.error('Error saving markdown:', error);
      setSavedMessage('Failed to save markdown content.');
    }
  };

  const handleCheckboxChange = (e) => {
    setIsFeaturedStory(e.target.checked);
    setMarkdownContent(''); // Reset markdown content when switching
  };

  return (
    <div className='story_editor'>
      <h1>{isFeaturedStory ? 'Featured Stories' : 'Top Stories'}</h1>
      <label>
        <input
          type="checkbox"
          checked={isFeaturedStory}
          onChange={handleCheckboxChange}
        />
        Featured Story
      </label>
      <MdEditor
        value={markdownContent}
        style={{ height: '500px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <UploadMedia />
      <div className='save_btn'>
        <button onClick={handleSave}>Save</button>
      </div>
      {savedMessage && <p>{savedMessage}</p>}
    </div>
  );
};

export default StoryEditor;
